import { upgrade } from "../shared/upgrade";

export class IaiSummaryListActions extends HTMLElement {
    connectedCallback() {
        upgrade(this, "dd", ["govuk-summary-list__actions"]);
    }
}

customElements.define("iai-summary-list-actions", IaiSummaryListActions);

declare global {
    interface HTMLElementTagNameMap {
        "iai-summary-list-actions": IaiSummaryListActions;
    }
}
