import { upgrade } from "../shared/upgrade";

export class IaiErrorSummaryBody extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-error-summary__body"]);
    }
}

customElements.define("iai-error-summary-body", IaiErrorSummaryBody);

declare global {
    interface HTMLElementTagNameMap {
        "iai-error-summary-body": IaiErrorSummaryBody;
    }
}
