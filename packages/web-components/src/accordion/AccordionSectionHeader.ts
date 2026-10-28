import { upgrade } from "../shared/upgrade";

export class IaiAccordionSectionHeader extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-accordion__section-header"]);
    }
}

customElements.define("iai-accordion-section-header", IaiAccordionSectionHeader);

declare global {
    interface HTMLElementTagNameMap {
        "iai-accordion-section-header": IaiAccordionSectionHeader;
    }
}
