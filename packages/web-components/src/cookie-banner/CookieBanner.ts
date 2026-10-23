import { upgrade } from "../shared/upgrade.js";

export class IaiCookieBanner extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-cookie-banner"], [], { "data-nosnippet": "", role: "region", "aria-label": "Cookie banner" });
    }
}

customElements.define("iai-cookie-banner", IaiCookieBanner);

declare global {
    interface HTMLElementTagNameMap {
        "iai-cookie-banner": IaiCookieBanner;
    }
}
