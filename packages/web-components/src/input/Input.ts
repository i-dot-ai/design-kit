import { upgrade } from "../shared/upgrade";

const WIDTHS = new Set(["2", "3", "4", "5", "10", "20", "30"]);

export class IaiInput extends HTMLElement {
    connectedCallback() {
        const width = this.getAttribute("width");
        upgrade(this, "input", [
            "govuk-input",
            this.hasAttribute("error") && "govuk-input--error",
            this.hasAttribute("extraletterspacing") && "govuk-input--extra-letter-spacing",
            this.hasAttribute("subtle") && "govuk-input--subtle",
            width && WIDTHS.has(width) && `govuk-input--width-${width}`,
        ], ["error", "extraletterspacing", "subtle", "width"], { type: "text" });
    }
}

customElements.define("iai-input", IaiInput);

declare global {
    interface HTMLElementTagNameMap {
        "iai-input": IaiInput;
    }
}
