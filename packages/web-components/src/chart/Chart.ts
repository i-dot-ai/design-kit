import { initChart, formatChartValue } from "@i-dot-ai-npm/component-library-frontend";
import type { ChartData } from "@i-dot-ai-npm/component-library-frontend";
import { create } from "../shared/upgrade";

type ChartInstance = ReturnType<typeof initChart>;

/**
 * Unlike most components, the chart stays on the page as `<iai-chart>` so it
 * can redraw when `data`, `variant` or `title` change, like the framework
 * versions. It takes the `iai-chart` classes and renders the same content as
 * the plain HTML chart inside itself.
 *
 *   <iai-chart variant="pie" title="…" description="…" heading-level="2">
 *     <script type="application/json">{ "heading": …, "labels": […], "datasets": […] }</script>
 *   </iai-chart>
 *
 * Values can be formatted with Intl.NumberFormat options as JSON in a `format`
 * attribute, or with a function set as the `format` property, which wins.
 */
export class IaiChart extends HTMLElement {
    static observedAttributes = ["variant", "title", "description", "heading-level", "format"];

    #data: ChartData | undefined;
    #format: ((value: number) => string) | undefined;
    #title = "";
    #chart: ChartInstance;

    get data(): ChartData | undefined {
        return this.#data;
    }

    set data(value: ChartData | undefined) {
        this.#data = value;
        this.#render();
    }

    /** Formats values in the table, on the axes, in tooltips and in value labels. Overrides the `format` attribute. */
    get format(): ((value: number) => string) | undefined {
        return this.#format;
    }

    set format(value: ((value: number) => string) | undefined) {
        this.#format = value;
    }

    connectedCallback() {
        // A page script can set these before the element is defined, which hides the setters; take them over.
        const early = this as { data?: ChartData; format?: (value: number) => string };
        if (Object.hasOwn(this, "data")) {
            const data = early.data;
            delete early.data;
            this.#data = data;
        }
        if (Object.hasOwn(this, "format")) {
            const format = early.format;
            delete early.format;
            this.#format = format;
        }
        this.#render();
    }

    disconnectedCallback() {
        this.#chart?.destroy();
        this.#chart = undefined;
    }

    attributeChangedCallback(name: string, _old: string | null, value: string | null) {
        // Removing the title (see #readTitle) is not a change to react to.
        if (name === "title" && value === null) return;
        if (this.isConnected) this.#render();
    }

    // Browsers call attributeChangedCallback before connectedCallback, so the
    // JSON is read on first render, whichever runs first.
    #readData() {
        const script = this.querySelector(':scope > script[type="application/json"]');
        if (!script || this.#data !== undefined) return;
        try {
            this.#data = JSON.parse(script.textContent ?? "");
        } catch (error) {
            console.error(`iai-chart "${this.#readTitle()}": data is not valid JSON.`, error);
        }
    }

    // The title attribute would show as a tooltip over the whole chart, so it
    // is moved into the heading and removed from the element.
    #readTitle() {
        if (this.hasAttribute("title")) {
            this.#title = this.getAttribute("title") ?? "";
            this.removeAttribute("title");
        }
        return this.#title;
    }

    #render() {
        this.#readData();
        const title = this.#readTitle();
        const variant = this.getAttribute("variant") ?? "";
        this.#chart?.destroy();
        this.#chart = undefined;
        for (const cls of Array.from(this.classList)) if (cls.startsWith("iai-chart--")) this.classList.remove(cls);
        this.classList.add("iai-chart", `iai-chart--${variant}`);
        this.setAttribute("data-module", "iai-chart");
        // The behaviour layer reads Intl.NumberFormat options from data-iai-chart-format, as on a plain HTML chart.
        const formatOptions = this.#formatOptions(title);
        if (formatOptions) this.setAttribute("data-iai-chart-format", JSON.stringify(formatOptions));
        else this.removeAttribute("data-iai-chart-format");

        const data = this.#data;
        if (!data) {
            this.replaceChildren();
            return;
        }
        const level = Number(this.getAttribute("heading-level"));
        const heading = create(`h${level >= 1 && level <= 6 ? level : 3}`, "govuk-heading-m", {}, title);
        const description = this.getAttribute("description");
        this.replaceChildren(
            heading,
            ...(description ? [create("p", "govuk-body iai-chart__description", {}, description)] : []),
            this.#details(title, data, formatOptions),
        );
        // Charts on the page when initAllIAIDesignSystem() runs are drawn by it; initChart returns
        // that chart instead of drawing a second one, or redraws it if a format property is set.
        this.#chart = initChart(this, { format: this.#format });
    }

    // Intl.NumberFormat options from the format attribute, checked once here so a bad value logs one error
    // and the chart falls back to plain numbers, as a plain HTML chart does.
    #formatOptions(title: string): Intl.NumberFormatOptions | undefined {
        const json = this.getAttribute("format");
        if (!json) return undefined;
        try {
            const options = JSON.parse(json) as Intl.NumberFormatOptions;
            formatChartValue(0, options);
            return options;
        } catch (error) {
            console.error(`iai-chart "${title}": format is not valid Intl.NumberFormat options as JSON.`, error);
            return undefined;
        }
    }

    #details(title: string, { heading, labels, datasets }: ChartData, formatOptions?: Intl.NumberFormatOptions) {
        const firstColour = datasets[0]?.colour;
        const sliceColours = Array.isArray(firstColour) ? firstColour : [];
        const th = (text: string, scope: string, attrs: Record<string, string | undefined> = {}, numeric = false) =>
            create(
                "th",
                ["govuk-table__header", numeric ? "govuk-table__header--numeric" : ""].filter(Boolean).join(" "),
                { scope, ...definedOnly(attrs) },
                text,
            );

        const headRow = create(
            "tr",
            "govuk-table__row",
            {},
            th(heading, "col"),
            ...datasets.map((d) =>
                th(
                    d.label,
                    "col",
                    {
                        "data-iai-chart-colour": Array.isArray(d.colour) ? undefined : d.colour,
                        "data-iai-chart-line": d.line,
                    },
                    true,
                ),
            ),
        );
        const bodyRows = labels.map((label, row) =>
            create(
                "tr",
                "govuk-table__row",
                {},
                th(label, "row", { "data-iai-chart-colour": sliceColours[row] }),
                ...datasets.map((d) => {
                    const value = d.data[row] ?? null;
                    const format = this.#format;
                    const options = format ? undefined : formatOptions;
                    return create(
                        "td",
                        "govuk-table__cell govuk-table__cell--numeric",
                        (format || options) && value != null ? { "data-value": String(value) } : {},
                        value == null ? "–" : format ? format(value) : formatChartValue(value, options),
                    );
                }),
            ),
        );

        return create(
            "details",
            "govuk-details",
            {},
            create("summary", "govuk-details__summary", {}, create("span", "govuk-details__summary-text", {}, "Show data", create("span", "govuk-visually-hidden", {}, ` for ${title}`))),
            create(
                "div",
                "govuk-details__text",
                {},
                create(
                    "table",
                    "govuk-table",
                    {},
                    create("caption", "govuk-table__caption govuk-table__caption--s", {}, title),
                    create("thead", "govuk-table__head", {}, headRow),
                    create("tbody", "govuk-table__body", {}, ...bodyRows),
                ),
            ),
        );
    }
}

function definedOnly(attrs: Record<string, string | undefined>): Record<string, string> {
    return Object.fromEntries(Object.entries(attrs).filter((entry): entry is [string, string] => entry[1] !== undefined));
}

customElements.define("iai-chart", IaiChart);

declare global {
    interface HTMLElementTagNameMap {
        "iai-chart": IaiChart;
    }
}
