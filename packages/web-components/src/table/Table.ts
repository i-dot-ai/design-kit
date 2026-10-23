import { upgrade } from "../shared/upgrade.js";

export class IaiTable extends HTMLElement {
    connectedCallback() {
        upgrade(this, "table", ["govuk-table", this.hasAttribute("smalltextuntiltablet") && "govuk-table--small-text-until-tablet", this.hasAttribute("subtle") && "govuk-table--subtle", this.hasAttribute("summary") && "govuk-table--summary"], ["smalltextuntiltablet", "subtle", "summary"]);
    }
}

customElements.define("iai-table", IaiTable);

declare global {
    interface HTMLElementTagNameMap {
        "iai-table": IaiTable;
    }
}
