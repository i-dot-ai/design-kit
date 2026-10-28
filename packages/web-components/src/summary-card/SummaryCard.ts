import { upgrade } from "../shared/upgrade";

export class IaiSummaryCard extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-summary-card"]);
    }
}

customElements.define("iai-summary-card", IaiSummaryCard);

declare global {
    interface HTMLElementTagNameMap {
        "iai-summary-card": IaiSummaryCard;
    }
}
