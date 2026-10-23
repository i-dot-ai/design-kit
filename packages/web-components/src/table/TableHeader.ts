import { upgrade } from "../shared/upgrade.js";

export class IaiTableHeader extends HTMLElement {
    connectedCallback() {
        upgrade(this, "th", ["govuk-table__header", this.hasAttribute("numeric") && "govuk-table__header--numeric"], ["numeric"], { scope: "col" });
    }
}

customElements.define("iai-table-header", IaiTableHeader);

declare global {
    interface HTMLElementTagNameMap {
        "iai-table-header": IaiTableHeader;
    }
}
