import { describe, it, expect } from "vitest";
import { renderHtml } from "./web-components";

function mount(html: string): HTMLElement {
    const host = document.createElement("div");
    host.innerHTML = html;
    document.body.append(host);
    return host;
}

describe("web components upgrade", () => {
    it("keeps text as text", () => {
        const host = mount(`<iai-hint>&lt;img src=x onerror=alert(1)&gt;</iai-hint>`);
        expect(host.querySelector("img")).toBeNull();
        expect(host.querySelector(".govuk-hint")!.textContent).toBe("<img src=x onerror=alert(1)>");
    });

    it("keeps nested markup", () => {
        const host = mount(`<iai-hint>See <a href="/help">help</a></iai-hint>`);
        expect(host.querySelector(".govuk-hint a")!.getAttribute("href")).toBe("/help");
    });

    it("leaves no custom tags behind", () => {
        const html = renderHtml(`<iai-form-group><iai-input-label for="e">Email</iai-input-label><iai-input id="e"></iai-input></iai-form-group>`);
        expect(html).not.toContain("<iai-");
        expect(html).toContain(`<label class="govuk-label" for="e">Email</label>`);
        expect(html).toMatch(/^<div class="govuk-form-group"><label[^>]*>Email<\/label><input [^>]*class="govuk-input"[^>]*><\/div>$/);
    });

    it("composes a table", () => {
        const html = renderHtml(
            `<iai-table><iai-table-body><iai-table-row><iai-table-header scope="row">Jan</iai-table-header><iai-table-cell numeric>£85</iai-table-cell></iai-table-row></iai-table-body></iai-table>`,
        );
        expect(html).toBe(
            `<table class="govuk-table"><tbody class="govuk-table__body"><tr class="govuk-table__row"><th class="govuk-table__header" scope="row">Jan</th><td class="govuk-table__cell govuk-table__cell--numeric">£85</td></tr></tbody></table>`,
        );
    });
});
