import { upgrade, wrapContents } from "../shared/upgrade.js";

export class IaiErrorSummary extends HTMLElement {
    connectedCallback() {
        const div = upgrade(this, "div", ["govuk-error-summary"], [], { "data-module": "govuk-error-summary" });
        wrapContents(div, "div", "").setAttribute("role", "alert");
    }
}

customElements.define("iai-error-summary", IaiErrorSummary);

declare global {
    interface HTMLElementTagNameMap {
        "iai-error-summary": IaiErrorSummary;
    }
}
