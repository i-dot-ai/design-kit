import { upgrade } from "../shared/upgrade";

export class IaiDateInputField extends HTMLElement {
    connectedCallback() {
        const width = this.getAttribute("width");
        upgrade(this, "input", [
            "govuk-input govuk-date-input__input",
            (width === "2" || width === "3" || width === "4") && `govuk-input--width-${width}`,
        ], ["width"], { type: "text", inputmode: "numeric" });
    }
}

customElements.define("iai-date-input-field", IaiDateInputField);

declare global {
    interface HTMLElementTagNameMap {
        "iai-date-input-field": IaiDateInputField;
    }
}
