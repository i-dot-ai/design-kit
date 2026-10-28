import { create, isTag, slotted, takeChildren, upgrade } from "../shared/upgrade";

export class IaiServiceNavigation extends HTMLElement {
    connectedCallback() {
        const serviceName = this.getAttribute("servicename");
        const serviceUrl = this.getAttribute("serviceurl");
        const navigationId = this.getAttribute("navigationid") ?? "navigation";
        const menuButtonText = this.getAttribute("menubuttontext") ?? "Menu";
        const collapse = this.hasAttribute("collapsenavigationonmobile");
        const nodes = takeChildren(this);
        const end = slotted(nodes, "end");
        const items = nodes.filter((n) => n !== end && (isTag("iai-service-navigation-item")(n) || isTag("li")(n)));
        const useSection = serviceName !== null || end !== undefined;

        const inner = create("div", "govuk-service-navigation__container");
        if (serviceName !== null) {
            inner.append(create("span", "govuk-service-navigation__service-name", {}, serviceUrl !== null
                ? create("a", "govuk-service-navigation__link", { href: serviceUrl }, serviceName)
                : create("span", "govuk-service-navigation__text", {}, serviceName)));
        }
        if (items.length) {
            const nav = create("nav", "govuk-service-navigation__wrapper", { "aria-label": menuButtonText });
            if (collapse) nav.append(create("button", "govuk-service-navigation__toggle govuk-js-service-navigation-toggle", { type: "button", "aria-controls": navigationId, hidden: "", "aria-hidden": "true" }, menuButtonText));
            nav.append(create("ul", "govuk-service-navigation__list", { id: navigationId }, ...items));
            inner.append(nav);
        }
        const container = create("div", ["govuk-width-container", this.hasAttribute("endslotinline") && "govuk-service-navigation__inlining-container"].filter(Boolean).join(" "), {}, inner);
        if (end) container.append(...end.childNodes);

        upgrade(
            this,
            useSection ? "section" : "div",
            ["govuk-service-navigation", this.hasAttribute("sidenav") && "govuk-service-navigation--side-nav", this.hasAttribute("inverse") && "govuk-service-navigation--inverse"],
            ["servicename", "serviceurl", "navigationid", "menubuttontext", "collapsenavigationonmobile", "endslotinline", "sidenav", "inverse"],
            { "data-module": "govuk-service-navigation", ...(useSection ? { "aria-label": "Service information" } : {}) },
        ).append(container);
    }
}

customElements.define("iai-service-navigation", IaiServiceNavigation);

declare global {
    interface HTMLElementTagNameMap {
        "iai-service-navigation": IaiServiceNavigation;
    }
}
