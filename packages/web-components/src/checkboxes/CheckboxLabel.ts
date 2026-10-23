import { upgrade } from "../shared/upgrade.js";

export class IaiCheckboxLabel extends HTMLElement {
    connectedCallback() {
        upgrade(this, "label", ["govuk-label govuk-checkboxes__label"]);
    }
}

customElements.define("iai-checkbox-label", IaiCheckboxLabel);

declare global {
    interface HTMLElementTagNameMap {
        "iai-checkbox-label": IaiCheckboxLabel;
    }
}
