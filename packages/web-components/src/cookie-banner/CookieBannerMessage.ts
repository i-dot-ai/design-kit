import { upgrade } from "../shared/upgrade";

export class IaiCookieBannerMessage extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-cookie-banner__message govuk-width-container"]);
    }
}

customElements.define("iai-cookie-banner-message", IaiCookieBannerMessage);

declare global {
    interface HTMLElementTagNameMap {
        "iai-cookie-banner-message": IaiCookieBannerMessage;
    }
}
