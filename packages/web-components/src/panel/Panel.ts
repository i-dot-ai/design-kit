import { upgrade } from "../shared/upgrade.js";

export class IaiPanel extends HTMLElement {
    connectedCallback() {
        const interruption = (this.getAttribute("class") ?? "").includes("govuk-panel--interruption");
        upgrade(this, "div", ["govuk-panel", !interruption && "govuk-panel--confirmation"]);
    }
}

customElements.define("iai-panel", IaiPanel);

declare global {
    interface HTMLElementTagNameMap {
        "iai-panel": IaiPanel;
    }
}
