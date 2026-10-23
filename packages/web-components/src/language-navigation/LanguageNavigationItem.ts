import { upgrade, wrapWith } from "../shared/upgrade.js";

export class IaiLanguageNavigationItem extends HTMLElement {
    connectedCallback() {
        const current = this.hasAttribute("current");
        const lang = this.getAttribute("lang");
        const description = this.getAttribute("languagedescriptiontext");
        const keep = ["current", "languagedescriptiontext"];
        const el = current
            ? upgrade(this, "span", ["govuk-language-navigation__text"], keep, { "aria-current": "true" })
            : upgrade(this, "a", ["govuk-language-navigation__link"], keep, { rel: "alternate", ...(lang && !this.hasAttribute("hreflang") ? { hreflang: lang } : {}) });
        if (!current && description) {
            const span = document.createElement("span");
            span.className = "govuk-visually-hidden";
            span.textContent = ` ${description}`;
            el.append(span);
        }
        wrapWith(el, "li", "govuk-language-navigation__list-item");
    }
}

customElements.define("iai-language-navigation-item", IaiLanguageNavigationItem);

declare global {
    interface HTMLElementTagNameMap {
        "iai-language-navigation-item": IaiLanguageNavigationItem;
    }
}
