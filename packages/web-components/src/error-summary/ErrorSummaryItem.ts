import { upgrade, wrapWith } from "../shared/upgrade";

export class IaiErrorSummaryItem extends HTMLElement {
    connectedCallback() {
        if (this.hasAttribute("href")) wrapWith(upgrade(this, "a", []), "li", "");
        else upgrade(this, "li", [], ["class"]);
    }
}

customElements.define("iai-error-summary-item", IaiErrorSummaryItem);

declare global {
    interface HTMLElementTagNameMap {
        "iai-error-summary-item": IaiErrorSummaryItem;
    }
}
