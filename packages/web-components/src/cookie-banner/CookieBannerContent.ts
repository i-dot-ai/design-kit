import { upgrade } from "../shared/upgrade";

export class IaiCookieBannerContent extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-cookie-banner__content"]);
    }
}

customElements.define("iai-cookie-banner-content", IaiCookieBannerContent);

declare global {
    interface HTMLElementTagNameMap {
        "iai-cookie-banner-content": IaiCookieBannerContent;
    }
}
