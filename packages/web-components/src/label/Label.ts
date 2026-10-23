import { upgrade, wrapWith } from "../shared/upgrade.js";

const SIZES: Record<string, string> = { small: "govuk-label--s", medium: "govuk-label--m", large: "govuk-label--l", xl: "govuk-label--xl" };

export class IaiLabel extends HTMLElement {
    connectedCallback() {
        const isPageHeading = this.hasAttribute("ispageheading");
        const label = upgrade(this, "label", ["govuk-label", SIZES[this.getAttribute("size") ?? ""]], ["size", "ispageheading"]);
        if (isPageHeading) wrapWith(label, "h1", "govuk-label-wrapper");
    }
}

customElements.define("iai-label", IaiLabel);

declare global {
    interface HTMLElementTagNameMap {
        "iai-label": IaiLabel;
    }
}
