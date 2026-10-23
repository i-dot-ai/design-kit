import { upgrade } from "../shared/upgrade.js";

export class IaiCheckboxDivider extends HTMLElement {
    connectedCallback() {
        if (!this.hasChildNodes()) this.textContent = "or";
        upgrade(this, "div", ["govuk-checkboxes__divider"]);
    }
}

customElements.define("iai-checkbox-divider", IaiCheckboxDivider);

declare global {
    interface HTMLElementTagNameMap {
        "iai-checkbox-divider": IaiCheckboxDivider;
    }
}
