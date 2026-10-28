import { upgrade } from "../shared/upgrade";

export class IaiToggleItem extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["iai-toggle__item"]);
    }
}

customElements.define("iai-toggle-item", IaiToggleItem);

declare global {
    interface HTMLElementTagNameMap {
        "iai-toggle-item": IaiToggleItem;
    }
}
