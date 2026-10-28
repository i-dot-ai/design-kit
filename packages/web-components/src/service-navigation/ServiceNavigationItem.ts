import { create, takeChildren, upgrade, wrapWith } from "../shared/upgrade";

export class IaiServiceNavigationItem extends HTMLElement {
    connectedCallback() {
        const current = this.hasAttribute("current");
        const active = current || this.hasAttribute("active");
        const className = this.getAttribute("class");
        const hasHref = this.hasAttribute("href");
        const el = upgrade(
            this,
            hasHref ? "a" : "span",
            [hasHref ? "govuk-service-navigation__link" : "govuk-service-navigation__text"],
            ["current", "active", "class"],
            active ? { "aria-current": current ? "page" : "true" } : {},
        );
        if (active) el.append(create("strong", "govuk-service-navigation__active-fallback", {}, ...takeChildren(el)));
        wrapWith(el, "li", ["govuk-service-navigation__item", active && "govuk-service-navigation__item--active", className].filter(Boolean).join(" "));
    }
}

customElements.define("iai-service-navigation-item", IaiServiceNavigationItem);

declare global {
    interface HTMLElementTagNameMap {
        "iai-service-navigation-item": IaiServiceNavigationItem;
    }
}
