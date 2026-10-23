import { upgrade, wrapContents } from "../shared/upgrade.js";

export class IaiSideNavItem extends HTMLElement {
    connectedCallback() {
        const href = this.getAttribute("href");
        const li = upgrade(this, "li", ["side-nav__item"], ["href"]);
        const a = wrapContents(li, "a", "govuk-link govuk-link--no-visited-state govuk-!-font-size-16 govuk-link--no-underline");
        if (href !== null) a.setAttribute("href", href);
    }
}

customElements.define("iai-side-nav-item", IaiSideNavItem);

declare global {
    interface HTMLElementTagNameMap {
        "iai-side-nav-item": IaiSideNavItem;
    }
}
