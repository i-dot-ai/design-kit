import { upgrade } from "../shared/upgrade.js";

export class IaiTabPanel extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-tabs__panel", this.hasAttribute("hidden") && "govuk-tabs__panel--hidden"], ["hidden"]);
    }
}

customElements.define("iai-tab-panel", IaiTabPanel);

declare global {
    interface HTMLElementTagNameMap {
        "iai-tab-panel": IaiTabPanel;
    }
}
