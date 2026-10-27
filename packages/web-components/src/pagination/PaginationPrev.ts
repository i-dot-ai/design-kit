import { create, hasContent, takeChildren, upgrade, wrapWith } from "../shared/upgrade.js";
import { PAGINATION_PREV_ICON } from "../shared/icons.js";

export class IaiPaginationPrev extends HTMLElement {
    connectedCallback() {
        const block = this.hasAttribute("block");
        const labelText = this.getAttribute("labeltext");
        const a = upgrade(this, "a", ["govuk-link govuk-pagination__link"], ["block", "labeltext"], { rel: "prev" });
        const content = takeChildren(a);
        const title = create("span", ["govuk-pagination__link-title", block && !labelText && "govuk-pagination__link-title--decorated"].filter(Boolean).join(" "));
        if (hasContent(content)) title.append(...content);
        else title.append("Previous", create("span", "govuk-visually-hidden", {}, " page"));
        a.append(title);
        if (labelText && block) a.append(create("span", "govuk-visually-hidden", {}, ":"), create("span", "govuk-pagination__link-label", {}, labelText));
        a.insertAdjacentHTML("afterbegin", PAGINATION_PREV_ICON);
        wrapWith(a, "div", "govuk-pagination__prev");
    }
}

customElements.define("iai-pagination-prev", IaiPaginationPrev);

declare global {
    interface HTMLElementTagNameMap {
        "iai-pagination-prev": IaiPaginationPrev;
    }
}
