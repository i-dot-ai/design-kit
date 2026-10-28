import { upgrade, wrapContents } from "../shared/upgrade";

export class IaiContentsPanelItem extends HTMLElement {
    connectedCallback() {
        const href = this.getAttribute("href");
        const current = this.hasAttribute("current");
        const li = upgrade(this, "li", ["contents-panel__list-item", current && "contents-panel__list-item--current"], ["href", "current"]);
        const a = wrapContents(li, "a", "contents-panel__link govuk-link govuk-link--no-visited-state govuk-link--no-underline");
        if (href !== null) a.setAttribute("href", href);
        if (current) a.setAttribute("aria-current", "page");
    }
}

customElements.define("iai-contents-panel-item", IaiContentsPanelItem);

declare global {
    interface HTMLElementTagNameMap {
        "iai-contents-panel-item": IaiContentsPanelItem;
    }
}
