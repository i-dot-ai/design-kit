import { upgrade, wrapWith } from "../shared/upgrade.js";

export class IaiPaginationItem extends HTMLElement {
    connectedCallback() {
        if (this.hasAttribute("ellipsis")) {
            const li = upgrade(this, "li", ["govuk-pagination__item govuk-pagination__item--ellipsis"], ["ellipsis", "class"]);
            if (!li.textContent?.trim()) li.textContent = "⋯";
            return;
        }
        const current = this.hasAttribute("current");
        const a = upgrade(this, "a", ["govuk-link govuk-pagination__link"], ["current"], current ? { "aria-current": "page" } : {});
        wrapWith(a, "li", current ? "govuk-pagination__item govuk-pagination__item--current" : "govuk-pagination__item");
    }
}

customElements.define("iai-pagination-item", IaiPaginationItem);

declare global {
    interface HTMLElementTagNameMap {
        "iai-pagination-item": IaiPaginationItem;
    }
}
