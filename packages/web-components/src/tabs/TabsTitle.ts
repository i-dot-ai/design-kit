import { upgrade } from "../shared/upgrade.js";

export class IaiTabsTitle extends HTMLElement {
    connectedCallback() {
        upgrade(this, "h2", ["govuk-tabs__title"]);
    }
}

customElements.define("iai-tabs-title", IaiTabsTitle);

declare global {
    interface HTMLElementTagNameMap {
        "iai-tabs-title": IaiTabsTitle;
    }
}
