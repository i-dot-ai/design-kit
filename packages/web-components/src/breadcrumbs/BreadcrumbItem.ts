import { upgrade, wrapContents } from "../shared/upgrade.js";

export class IaiBreadcrumbItem extends HTMLElement {
    connectedCallback() {
        const href = this.getAttribute("href");
        const li = upgrade(this, "li", ["govuk-breadcrumbs__list-item"], ["href"], href === null ? { "aria-current": "page" } : {});
        if (href !== null) wrapContents(li, "a", "govuk-breadcrumbs__link").setAttribute("href", href);
    }
}

customElements.define("iai-breadcrumb-item", IaiBreadcrumbItem);

declare global {
    interface HTMLElementTagNameMap {
        "iai-breadcrumb-item": IaiBreadcrumbItem;
    }
}
