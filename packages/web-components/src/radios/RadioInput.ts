import { upgrade } from "../shared/upgrade";

export class IaiRadioInput extends HTMLElement {
    connectedCallback() {
        upgrade(this, "input", ["govuk-radios__input"], [], { type: "radio" });
    }
}

customElements.define("iai-radio-input", IaiRadioInput);

declare global {
    interface HTMLElementTagNameMap {
        "iai-radio-input": IaiRadioInput;
    }
}
