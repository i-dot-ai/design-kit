import { upgrade } from "../shared/upgrade";

export class IaiNotificationBannerHeading extends HTMLElement {
    connectedCallback() {
        upgrade(this, "p", ["govuk-notification-banner__heading"]);
    }
}

customElements.define("iai-notification-banner-heading", IaiNotificationBannerHeading);

declare global {
    interface HTMLElementTagNameMap {
        "iai-notification-banner-heading": IaiNotificationBannerHeading;
    }
}
