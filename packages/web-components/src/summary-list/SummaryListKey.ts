import { upgrade } from "../shared/upgrade";

export class IaiSummaryListKey extends HTMLElement {
    connectedCallback() {
        upgrade(this, "dt", ["govuk-summary-list__key"]);
    }
}

customElements.define("iai-summary-list-key", IaiSummaryListKey);

declare global {
    interface HTMLElementTagNameMap {
        "iai-summary-list-key": IaiSummaryListKey;
    }
}
