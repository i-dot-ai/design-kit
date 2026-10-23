import { upgrade } from "../shared/upgrade.js";

export class IaiSummaryList extends HTMLElement {
    connectedCallback() {
        upgrade(this, "dl", ["govuk-summary-list", this.hasAttribute("noborder") && "govuk-summary-list--no-border"], ["noborder"]);
    }
}

customElements.define("iai-summary-list", IaiSummaryList);

declare global {
    interface HTMLElementTagNameMap {
        "iai-summary-list": IaiSummaryList;
    }
}
