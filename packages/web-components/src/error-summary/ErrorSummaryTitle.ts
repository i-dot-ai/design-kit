import { upgrade } from "../shared/upgrade";

export class IaiErrorSummaryTitle extends HTMLElement {
    connectedCallback() {
        upgrade(this, "h2", ["govuk-error-summary__title"]);
    }
}

customElements.define("iai-error-summary-title", IaiErrorSummaryTitle);

declare global {
    interface HTMLElementTagNameMap {
        "iai-error-summary-title": IaiErrorSummaryTitle;
    }
}
