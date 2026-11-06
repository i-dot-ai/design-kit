import { describe, it, expect, afterEach } from "vitest";
import "@i-dot-ai-npm/component-library-web-components";
import { KEEPS_HOST, renderedShapeIgnoringHost } from "../../../match-iai-expected-html-helpers/expected";
import pieHtml from "@content/components/chart/examples/pie.html?raw";
import doughnutHtml from "@content/components/chart/examples/doughnut.html?raw";

const DATA = {
    heading: "Channel",
    labels: ["Online", "Phone", "Post", "In person"],
    datasets: [
        { label: "Applications", data: [6200, 1450, 820, 330] },
    ],
};

function mount(html: string) {
    const host = document.createElement("div");
    host.innerHTML = html;
    document.body.append(host);
    return host.querySelector("iai-chart") as HTMLElement & { data: unknown };
}

afterEach(() => document.body.replaceChildren());

describe("Chart web component", () => {
    it("stays on the page as iai-chart", () => {
        const el = mount(`<iai-chart variant="pie" title="t"><script type="application/json">${JSON.stringify(DATA)}</script></iai-chart>`);
        expect(el.isConnected).toBe(true);
        expect(el.classList.contains("iai-chart--pie")).toBe(true);
    });

    it("exposes the parsed JSON as its data property", () => {
        const el = mount(`<iai-chart variant="pie" title="t"><script type="application/json">${JSON.stringify(DATA)}</script></iai-chart>`);
        expect(el.data).toEqual(DATA);
    });

    it("re-renders when data is set", () => {
        const el = mount(`<iai-chart variant="pie" title="How applications were submitted"></iai-chart>`);
        el.data = DATA;
        expect(renderedShapeIgnoringHost(el.outerHTML, KEEPS_HOST.chart)).toEqual(renderedShapeIgnoringHost(pieHtml, KEEPS_HOST.chart));
    });

    it("re-renders when variant and title change", () => {
        const doughnutData = { heading: "Outcome", labels: ["Approved", "Refused", "Pending"], datasets: [{ label: "Applications", data: [5400, 1900, 1500] }] };
        const el = mount(`<iai-chart variant="pie" title="Old"></iai-chart>`);
        el.data = doughnutData;
        el.setAttribute("variant", "doughnut");
        el.setAttribute("title", "Application outcomes");
        expect(renderedShapeIgnoringHost(el.outerHTML, KEEPS_HOST.chart)).toEqual(renderedShapeIgnoringHost(doughnutHtml, KEEPS_HOST.chart));
    });

    it("adds a description and uses the heading level", () => {
        const el = mount(`<iai-chart variant="pie" title="t" description="A summary" heading-level="2"><script type="application/json">${JSON.stringify(DATA)}</script></iai-chart>`);
        expect(el.querySelector("h2")?.textContent).toBe("t");
        expect(el.querySelector("h3")).toBeNull();
        expect(el.querySelector(".iai-chart__description")?.textContent).toBe("A summary");
    });

    it("formats table values with format, keeping the number in data-value", () => {
        const el = mount(`<iai-chart variant="line" title="t"></iai-chart>`) as HTMLElement & { data: unknown; format: (v: number) => string };
        el.format = (v) => `${v}s`;
        el.data = { heading: "Month", labels: ["Jan", "Feb"], datasets: [{ label: "2026", data: [900, null] }] };
        const cells = el.querySelectorAll("tbody td");
        expect(cells[0].textContent).toBe("900s");
        expect(cells[0].getAttribute("data-value")).toBe("900");
        expect(cells[1].textContent).toBe("–");
        expect(cells[1].hasAttribute("data-value")).toBe(false);
    });

    it("formats values with Intl.NumberFormat options in the format attribute", () => {
        const el = mount(`<iai-chart variant="line" title="t" format='{"style":"unit","unit":"percent"}'></iai-chart>`);
        el.data = { heading: "Month", labels: ["Jan", "Feb"], datasets: [{ label: "2026", data: [2.5, null] }] };
        const cells = el.querySelectorAll("tbody td");
        expect(cells[0].textContent).toBe("2.5%");
        expect(cells[0].getAttribute("data-value")).toBe("2.5");
        expect(cells[1].hasAttribute("data-value")).toBe(false);
        expect(JSON.parse(el.getAttribute("data-iai-chart-format") ?? "")).toEqual({ style: "unit", unit: "percent" });
    });

    it("lets the format property win over the format attribute", () => {
        const el = mount(`<iai-chart variant="line" title="t" format='{"style":"unit","unit":"percent"}'></iai-chart>`) as HTMLElement & {
            data: unknown;
            format: (v: number) => string;
        };
        el.format = (v) => `${v}s`;
        el.data = { heading: "Month", labels: ["Jan"], datasets: [{ label: "2026", data: [900] }] };
        expect(el.querySelector("tbody td")?.textContent).toBe("900s");
    });

    it("logs a clear error and uses plain numbers for an invalid format attribute", () => {
        const errors: unknown[] = [];
        const original = console.error;
        console.error = (...args: unknown[]) => errors.push(args.join(" "));
        try {
            const el = mount(`<iai-chart variant="line" title="Bad format" format='{"style":"unit","unit":"minuts"}'></iai-chart>`);
            el.data = { heading: "Month", labels: ["Jan"], datasets: [{ label: "2026", data: [1240.5] }] };
            expect(el.querySelector("tbody td")?.textContent).toBe("1,240.5");
            expect(el.hasAttribute("data-iai-chart-format")).toBe(false);
            expect(String(errors[0])).toContain("Bad format");
        } finally {
            console.error = original;
        }
    });

    it("takes data and format set before the element is defined", () => {
        const el = document.createElement("iai-chart-early") as HTMLElement & { data?: unknown; format?: (v: number) => string };
        el.data = { heading: "Month", labels: ["Jan"], datasets: [{ label: "2026", data: [900] }] };
        el.format = (v) => `${v}s`;
        el.setAttribute("variant", "line");
        el.setAttribute("title", "t");
        document.body.append(el);
        // Run the definition after the properties were set, as when a page script runs before the kit loads.
        class Early extends (customElements.get("iai-chart") as CustomElementConstructor) {}
        customElements.define("iai-chart-early", Early);
        expect(el.querySelector("tbody td")?.textContent).toBe("900s");
        expect(Object.hasOwn(el, "data")).toBe(false);
    });

    it("logs a clear error and renders nothing for invalid JSON", () => {
        const errors: unknown[] = [];
        const original = console.error;
        console.error = (...args: unknown[]) => errors.push(args.join(" "));
        try {
            const el = mount(`<iai-chart variant="pie" title="Broken chart"><script type="application/json">{ not json</script></iai-chart>`);
            expect(el.querySelector("table")).toBeNull();
            expect(String(errors[0])).toContain("Broken chart");
        } finally {
            console.error = original;
        }
    });
});
