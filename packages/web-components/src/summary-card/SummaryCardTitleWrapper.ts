import { upgrade } from "../shared/upgrade.js";

export class IaiSummaryCardTitleWrapper extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-summary-card__title-wrapper"]);
    }
}

customElements.define("iai-summary-card-title-wrapper", IaiSummaryCardTitleWrapper);

declare global {
    interface HTMLElementTagNameMap {
        "iai-summary-card-title-wrapper": IaiSummaryCardTitleWrapper;
    }
}
