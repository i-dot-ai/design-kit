import { upgrade } from "../shared/upgrade";

export class IaiContentsPanelListHeading extends HTMLElement {
    connectedCallback() {
        upgrade(this, "h3", ["contents-panel__list-heading"]);
    }
}

customElements.define("iai-contents-panel-list-heading", IaiContentsPanelListHeading);

declare global {
    interface HTMLElementTagNameMap {
        "iai-contents-panel-list-heading": IaiContentsPanelListHeading;
    }
}
