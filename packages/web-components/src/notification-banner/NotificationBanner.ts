import { upgrade } from "../shared/upgrade";

export class IaiNotificationBanner extends HTMLElement {
    connectedCallback() {
        const success = this.hasAttribute("success");
        upgrade(this, "div", ["govuk-notification-banner", success && "govuk-notification-banner--success"], ["success"], {
            role: success ? "alert" : "region",
            "aria-labelledby": "govuk-notification-banner-title",
            "data-module": "govuk-notification-banner",
        });
    }
}

customElements.define("iai-notification-banner", IaiNotificationBanner);

declare global {
    interface HTMLElementTagNameMap {
        "iai-notification-banner": IaiNotificationBanner;
    }
}
