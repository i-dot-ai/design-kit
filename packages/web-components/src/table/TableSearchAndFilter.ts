import { upgrade } from "../shared/upgrade";

export class IaiTableSearchAndFilter extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-table__search-and-filter-wrapper"]);
    }
}

customElements.define("iai-table-search-and-filter", IaiTableSearchAndFilter);

declare global {
    interface HTMLElementTagNameMap {
        "iai-table-search-and-filter": IaiTableSearchAndFilter;
    }
}
