import { upgrade } from "../shared/upgrade";

export class IaiNotificationBannerContent extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-notification-banner__content"]);
    }
}

customElements.define("iai-notification-banner-content", IaiNotificationBannerContent);

declare global {
    interface HTMLElementTagNameMap {
        "iai-notification-banner-content": IaiNotificationBannerContent;
    }
}
