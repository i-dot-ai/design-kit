import { upgrade } from "../shared/upgrade.js";

export class IaiRadioLabel extends HTMLElement {
    connectedCallback() {
        upgrade(this, "label", ["govuk-label govuk-radios__label"]);
    }
}

customElements.define("iai-radio-label", IaiRadioLabel);

declare global {
    interface HTMLElementTagNameMap {
        "iai-radio-label": IaiRadioLabel;
    }
}
