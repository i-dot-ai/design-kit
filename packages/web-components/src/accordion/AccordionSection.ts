import { upgrade } from "../shared/upgrade.js";

export class IaiAccordionSection extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-accordion__section"]);
    }
}

customElements.define("iai-accordion-section", IaiAccordionSection);

declare global {
    interface HTMLElementTagNameMap {
        "iai-accordion-section": IaiAccordionSection;
    }
}
