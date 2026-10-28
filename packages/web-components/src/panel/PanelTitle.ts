import { upgrade } from "../shared/upgrade";

export class IaiPanelTitle extends HTMLElement {
    connectedCallback() {
        upgrade(this, "h1", ["govuk-panel__title"]);
    }
}

customElements.define("iai-panel-title", IaiPanelTitle);

declare global {
    interface HTMLElementTagNameMap {
        "iai-panel-title": IaiPanelTitle;
    }
}
