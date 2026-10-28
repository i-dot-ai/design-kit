import { upgrade } from "../shared/upgrade";

export class IaiPanelActions extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-panel__actions"]);
    }
}

customElements.define("iai-panel-actions", IaiPanelActions);

declare global {
    interface HTMLElementTagNameMap {
        "iai-panel-actions": IaiPanelActions;
    }
}
