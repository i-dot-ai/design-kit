import { upgrade, wrapContents } from "../shared/upgrade.js";

export class IaiPhaseBanner extends HTMLElement {
    connectedCallback() {
        wrapContents(upgrade(this, "div", ["govuk-phase-banner govuk-width-container"]), "p", "govuk-phase-banner__content");
    }
}

customElements.define("iai-phase-banner", IaiPhaseBanner);

declare global {
    interface HTMLElementTagNameMap {
        "iai-phase-banner": IaiPhaseBanner;
    }
}
