import { upgrade } from "../shared/upgrade";

export class IaiNotificationBannerTitle extends HTMLElement {
    connectedCallback() {
        upgrade(this, "h2", ["govuk-notification-banner__title"], [], { id: "govuk-notification-banner-title" });
    }
}

customElements.define("iai-notification-banner-title", IaiNotificationBannerTitle);

declare global {
    interface HTMLElementTagNameMap {
        "iai-notification-banner-title": IaiNotificationBannerTitle;
    }
}
