import { upgrade } from "../shared/upgrade.js";

export class IaiErrorSummaryList extends HTMLElement {
    connectedCallback() {
        upgrade(this, "ul", ["govuk-list govuk-error-summary__list"]);
    }
}

customElements.define("iai-error-summary-list", IaiErrorSummaryList);

declare global {
    interface HTMLElementTagNameMap {
        "iai-error-summary-list": IaiErrorSummaryList;
    }
}
