import { upgrade } from "../shared/upgrade";

export class IaiCookieBannerActions extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-button-group"]);
    }
}

customElements.define("iai-cookie-banner-actions", IaiCookieBannerActions);

declare global {
    interface HTMLElementTagNameMap {
        "iai-cookie-banner-actions": IaiCookieBannerActions;
    }
}
