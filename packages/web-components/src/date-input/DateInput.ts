import { upgrade } from "../shared/upgrade";

export class IaiDateInput extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-date-input"]);
    }
}

customElements.define("iai-date-input", IaiDateInput);

declare global {
    interface HTMLElementTagNameMap {
        "iai-date-input": IaiDateInput;
    }
}
