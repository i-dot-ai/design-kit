import { upgrade } from "../shared/upgrade.js";

export class IaiCheckboxInput extends HTMLElement {
    connectedCallback() {
        upgrade(this, "input", ["govuk-checkboxes__input"], [], { type: "checkbox" });
    }
}

customElements.define("iai-checkbox-input", IaiCheckboxInput);

declare global {
    interface HTMLElementTagNameMap {
        "iai-checkbox-input": IaiCheckboxInput;
    }
}
