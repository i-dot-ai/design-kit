import { upgrade } from "../shared/upgrade";

export class IaiSummaryListValue extends HTMLElement {
    connectedCallback() {
        upgrade(this, "dd", ["govuk-summary-list__value"]);
    }
}

customElements.define("iai-summary-list-value", IaiSummaryListValue);

declare global {
    interface HTMLElementTagNameMap {
        "iai-summary-list-value": IaiSummaryListValue;
    }
}
