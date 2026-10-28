import { upgrade } from "../shared/upgrade";

export class IaiSummaryCardAction extends HTMLElement {
    connectedCallback() {
        upgrade(this, "li", ["govuk-summary-card__action"]);
    }
}

customElements.define("iai-summary-card-action", IaiSummaryCardAction);

declare global {
    interface HTMLElementTagNameMap {
        "iai-summary-card-action": IaiSummaryCardAction;
    }
}
