import { upgrade } from "../shared/upgrade";

export class IaiPhaseBannerText extends HTMLElement {
    connectedCallback() {
        upgrade(this, "span", ["govuk-phase-banner__text"]);
    }
}

customElements.define("iai-phase-banner-text", IaiPhaseBannerText);

declare global {
    interface HTMLElementTagNameMap {
        "iai-phase-banner-text": IaiPhaseBannerText;
    }
}
