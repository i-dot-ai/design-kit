import { upgrade } from "../shared/upgrade";

export class IaiPaginationList extends HTMLElement {
    connectedCallback() {
        upgrade(this, "ul", ["govuk-pagination__list"]);
    }
}

customElements.define("iai-pagination-list", IaiPaginationList);

declare global {
    interface HTMLElementTagNameMap {
        "iai-pagination-list": IaiPaginationList;
    }
}
