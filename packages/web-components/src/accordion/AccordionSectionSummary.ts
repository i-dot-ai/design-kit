import { upgrade } from "../shared/upgrade.js";

export class IaiAccordionSectionSummary extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-accordion__section-summary govuk-body"]);
    }
}

customElements.define("iai-accordion-section-summary", IaiAccordionSectionSummary);

declare global {
    interface HTMLElementTagNameMap {
        "iai-accordion-section-summary": IaiAccordionSectionSummary;
    }
}
