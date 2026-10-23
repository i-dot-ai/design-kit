import { upgrade } from "../shared/upgrade.js";

export class IaiSummaryCardActions extends HTMLElement {
    connectedCallback() {
        upgrade(this, this.hasAttribute("single") ? "div" : "ul", ["govuk-summary-card__actions"], ["single"]);
    }
}

customElements.define("iai-summary-card-actions", IaiSummaryCardActions);

declare global {
    interface HTMLElementTagNameMap {
        "iai-summary-card-actions": IaiSummaryCardActions;
    }
}
