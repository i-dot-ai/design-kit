import { upgrade } from "../shared/upgrade.js";

export class IaiCookieBannerHeading extends HTMLElement {
    connectedCallback() {
        upgrade(this, "h2", ["govuk-cookie-banner__heading govuk-heading-m"]);
    }
}

customElements.define("iai-cookie-banner-heading", IaiCookieBannerHeading);

declare global {
    interface HTMLElementTagNameMap {
        "iai-cookie-banner-heading": IaiCookieBannerHeading;
    }
}
