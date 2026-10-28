import { upgrade } from "../shared/upgrade";

export class IaiAccordion extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-accordion"], [], { "data-module": "govuk-accordion" });
    }
}

customElements.define("iai-accordion", IaiAccordion);

declare global {
    interface HTMLElementTagNameMap {
        "iai-accordion": IaiAccordion;
    }
}
