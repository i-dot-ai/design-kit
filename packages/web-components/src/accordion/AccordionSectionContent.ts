import { upgrade } from "../shared/upgrade";

export class IaiAccordionSectionContent extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-accordion__section-content"]);
    }
}

customElements.define("iai-accordion-section-content", IaiAccordionSectionContent);

declare global {
    interface HTMLElementTagNameMap {
        "iai-accordion-section-content": IaiAccordionSectionContent;
    }
}
