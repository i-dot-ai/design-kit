import { upgrade } from "../shared/upgrade.js";

export class IaiTableCell extends HTMLElement {
    connectedCallback() {
        upgrade(this, "td", ["govuk-table__cell", this.hasAttribute("numeric") && "govuk-table__cell--numeric", this.hasAttribute("stretch") && "govuk-table__cell--stretch", this.hasAttribute("nowrap") && "govuk-table__cell--no-wrap", this.hasAttribute("small") && "govuk-table__cell--small"], ["numeric", "stretch", "nowrap", "small"]);
    }
}

customElements.define("iai-table-cell", IaiTableCell);

declare global {
    interface HTMLElementTagNameMap {
        "iai-table-cell": IaiTableCell;
    }
}
