import { upgrade, wrapContents } from "../shared/upgrade";

const SIZES: Record<string, string> = { small: "govuk-fieldset__legend--s", medium: "govuk-fieldset__legend--m", large: "govuk-fieldset__legend--l", xl: "govuk-fieldset__legend--xl" };

export class IaiFieldsetLegend extends HTMLElement {
    connectedCallback() {
        const isPageHeading = this.hasAttribute("ispageheading");
        const legend = upgrade(this, "legend", ["govuk-fieldset__legend", SIZES[this.getAttribute("size") ?? ""]], ["size", "ispageheading"]);
        if (isPageHeading) wrapContents(legend, "h1", "govuk-fieldset__heading");
    }
}

customElements.define("iai-fieldset-legend", IaiFieldsetLegend);

declare global {
    interface HTMLElementTagNameMap {
        "iai-fieldset-legend": IaiFieldsetLegend;
    }
}
