import { upgrade, wrapContents } from "../shared/upgrade.js";

export class IaiDetailsSummary extends HTMLElement {
    connectedCallback() {
        wrapContents(upgrade(this, "summary", ["govuk-details__summary"]), "span", "govuk-details__summary-text");
    }
}

customElements.define("iai-details-summary", IaiDetailsSummary);

declare global {
    interface HTMLElementTagNameMap {
        "iai-details-summary": IaiDetailsSummary;
    }
}
