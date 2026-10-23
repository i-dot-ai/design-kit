import { upgrade } from "../shared/upgrade.js";

const SIZES: Record<string, string> = { small: "govuk-label--s", medium: "govuk-label--m", large: "govuk-label--l", xl: "govuk-label--xl" };

export class IaiInputLabel extends HTMLElement {
    connectedCallback() {
        upgrade(this, "label", ["govuk-label", SIZES[this.getAttribute("size") ?? ""]], ["size"]);
    }
}

customElements.define("iai-input-label", IaiInputLabel);

declare global {
    interface HTMLElementTagNameMap {
        "iai-input-label": IaiInputLabel;
    }
}
