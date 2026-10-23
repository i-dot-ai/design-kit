import { upgrade } from "../shared/upgrade.js";

export class IaiSummaryCardContent extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-summary-card__content"]);
    }
}

customElements.define("iai-summary-card-content", IaiSummaryCardContent);

declare global {
    interface HTMLElementTagNameMap {
        "iai-summary-card-content": IaiSummaryCardContent;
    }
}
