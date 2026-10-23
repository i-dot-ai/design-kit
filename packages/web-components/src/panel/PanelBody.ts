import { upgrade } from "../shared/upgrade.js";

export class IaiPanelBody extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-panel__body"]);
    }
}

customElements.define("iai-panel-body", IaiPanelBody);

declare global {
    interface HTMLElementTagNameMap {
        "iai-panel-body": IaiPanelBody;
    }
}
