import { upgrade } from "../shared/upgrade.js";

export class IaiContentsPanelList extends HTMLElement {
    connectedCallback() {
        upgrade(this, "ul", ["contents-panel__list"]);
    }
}

customElements.define("iai-contents-panel-list", IaiContentsPanelList);

declare global {
    interface HTMLElementTagNameMap {
        "iai-contents-panel-list": IaiContentsPanelList;
    }
}
