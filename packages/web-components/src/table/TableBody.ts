import { upgrade } from "../shared/upgrade";

export class IaiTableBody extends HTMLElement {
    connectedCallback() {
        upgrade(this, "tbody", ["govuk-table__body"]);
    }
}

customElements.define("iai-table-body", IaiTableBody);

declare global {
    interface HTMLElementTagNameMap {
        "iai-table-body": IaiTableBody;
    }
}
