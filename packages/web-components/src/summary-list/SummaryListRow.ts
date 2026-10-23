import { upgrade } from "../shared/upgrade.js";

export class IaiSummaryListRow extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-summary-list__row", this.hasAttribute("noactions") && "govuk-summary-list__row--no-actions"], ["noactions"]);
    }
}

customElements.define("iai-summary-list-row", IaiSummaryListRow);

declare global {
    interface HTMLElementTagNameMap {
        "iai-summary-list-row": IaiSummaryListRow;
    }
}
