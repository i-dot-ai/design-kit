import { upgrade, wrapContents } from "../shared/upgrade";

export class IaiLanguageNavigation extends HTMLElement {
    connectedCallback() {
        wrapContents(upgrade(this, "nav", ["govuk-language-navigation"], [], { "aria-label": "Language" }), "ul", "govuk-language-navigation__list");
    }
}

customElements.define("iai-language-navigation", IaiLanguageNavigation);

declare global {
    interface HTMLElementTagNameMap {
        "iai-language-navigation": IaiLanguageNavigation;
    }
}
