import { upgrade } from "../shared/upgrade";

export class IaiSummaryCardTitle extends HTMLElement {
    connectedCallback() {
        upgrade(this, "h2", ["govuk-summary-card__title"]);
    }
}

customElements.define("iai-summary-card-title", IaiSummaryCardTitle);

declare global {
    interface HTMLElementTagNameMap {
        "iai-summary-card-title": IaiSummaryCardTitle;
    }
}
