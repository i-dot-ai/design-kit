import { upgrade } from "../shared/upgrade.js";

export class IaiPagination extends HTMLElement {
    connectedCallback() {
        upgrade(this, "nav", ["govuk-pagination", this.hasAttribute("block") && "govuk-pagination--block"], ["block"], { "aria-label": "Pagination" });
    }
}

customElements.define("iai-pagination", IaiPagination);

declare global {
    interface HTMLElementTagNameMap {
        "iai-pagination": IaiPagination;
    }
}
