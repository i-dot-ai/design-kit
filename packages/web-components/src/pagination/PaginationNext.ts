import { create, hasContent, takeChildren, upgrade, wrapWith } from "../shared/upgrade";
import { PAGINATION_NEXT_ICON } from "../shared/icons";

export class IaiPaginationNext extends HTMLElement {
    connectedCallback() {
        const block = this.hasAttribute("block");
        const labelText = this.getAttribute("labeltext");
        const a = upgrade(this, "a", ["govuk-link govuk-pagination__link"], ["block", "labeltext"], { rel: "next" });
        const content = takeChildren(a);
        const title = create("span", ["govuk-pagination__link-title", block && !labelText && "govuk-pagination__link-title--decorated"].filter(Boolean).join(" "));
        if (hasContent(content)) title.append(...content);
        else title.append("Next", create("span", "govuk-visually-hidden", {}, " page"));
        a.append(title);
        if (labelText && block) a.append(create("span", "govuk-visually-hidden", {}, ":"), create("span", "govuk-pagination__link-label", {}, labelText));
        a.insertAdjacentHTML(block ? "afterbegin" : "beforeend", PAGINATION_NEXT_ICON);
        wrapWith(a, "div", "govuk-pagination__next");
    }
}

customElements.define("iai-pagination-next", IaiPaginationNext);

declare global {
    interface HTMLElementTagNameMap {
        "iai-pagination-next": IaiPaginationNext;
    }
}
