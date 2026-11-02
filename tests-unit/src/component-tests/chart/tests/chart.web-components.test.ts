import { describe, it, expect, afterEach } from "vitest";
import "@i-dot-ai-npm/component-library-web-components";
import { KEEPS_HOST, renderedShapeIgnoringHost } from "../../../match-iai-expected-html-helpers/expected";
import pieHtml from "@content/components/chart/examples/pie.html?raw";
import doughnutHtml from "@content/components/chart/examples/doughnut.html?raw";

const DATA = {
    heading: "Channel",
    labels: ["Online", "Phone", "Post", "In person"],
    datasets: [
        { label: "Applications", colour: ["blue-shade-50", "blue", "teal-tint-25", "magenta"], data: [6200, 1450, 820, 330] },
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
