import { upgrade, wrapWith } from "../shared/upgrade.js";

export class IaiAccordionSectionHeading extends HTMLElement {
    connectedCallback() {
        wrapWith(upgrade(this, "span", ["govuk-accordion__section-button"]), "h2", "govuk-accordion__section-heading");
    }
}

customElements.define("iai-accordion-section-heading", IaiAccordionSectionHeading);

declare global {
    interface HTMLElementTagNameMap {
        "iai-accordion-section-heading": IaiAccordionSectionHeading;
    }
}
