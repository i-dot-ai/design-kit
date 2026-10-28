import { upgrade } from "../shared/upgrade";

export class IaiTableRow extends HTMLElement {
    connectedCallback() {
        upgrade(this, "tr", ["govuk-table__row"]);
    }
}

customElements.define("iai-table-row", IaiTableRow);

declare global {
    interface HTMLElementTagNameMap {
        "iai-table-row": IaiTableRow;
    }
}
