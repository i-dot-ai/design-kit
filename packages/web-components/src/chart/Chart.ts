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
 *   <iai-chart variant="pie" title="…">
 *     <script type="application/json">{ "heading": …, "labels": […], "datasets": […] }</script>
 *   </iai-chart>
 */
export class IaiChart extends HTMLElement {
    static observedAttributes = ["variant", "title"];

    #data: ChartData | undefined;
    #title = "";
    #chart: ChartInstance;

    get data(): ChartData | undefined {
        return this.#data;
    }

    set data(value: ChartData | undefined) {
        this.#data = value;
        this.#render();
    }

    connectedCallback() {
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

        const data = this.#data;
        if (!data) {
            this.replaceChildren();
            return;
        }
        this.replaceChildren(create("h3", "govuk-heading-m", {}, title), this.#details(title, data));
        // Charts on the page when initAllIAIDesignSystem() runs are drawn by it;
        // initChart returns that chart instead of drawing a second one.
        this.#chart = initChart(this);
    }

    #details(title: string, { heading, labels, datasets }: ChartData) {
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
                ...datasets.map((d) =>
                    create("td", "govuk-table__cell govuk-table__cell--numeric", {}, formatChartValue(d.data[row] ?? null)),
                ),
            ),
        );

        return create(
            "details",
            "govuk-details",
            {},
            create("summary", "govuk-details__summary", {}, create("span", "govuk-details__summary-text", {}, "Show data")),
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
