import { upgrade } from "../shared/upgrade";

export class IaiTableHead extends HTMLElement {
    connectedCallback() {
        upgrade(this, "thead", ["govuk-table__head"]);
    }
}

customElements.define("iai-table-head", IaiTableHead);

declare global {
    interface HTMLElementTagNameMap {
        "iai-table-head": IaiTableHead;
    }
}
