import { upgrade } from "../shared/upgrade";

export class IaiNotificationBannerHeader extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-notification-banner__header"]);
    }
}

customElements.define("iai-notification-banner-header", IaiNotificationBannerHeader);

declare global {
    interface HTMLElementTagNameMap {
        "iai-notification-banner-header": IaiNotificationBannerHeader;
    }
}
