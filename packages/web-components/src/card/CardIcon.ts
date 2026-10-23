import { upgrade } from "../shared/upgrade.js";

export class IaiCardIcon extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["iai-card__icon"], [], { "aria-hidden": "true" });
    }
}

customElements.define("iai-card-icon", IaiCardIcon);

declare global {
    interface HTMLElementTagNameMap {
        "iai-card-icon": IaiCardIcon;
    }
}
