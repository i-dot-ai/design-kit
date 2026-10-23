import { upgrade } from "../shared/upgrade.js";

export class IaiCardHeading extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["iai-card__heading"]);
    }
}

customElements.define("iai-card-heading", IaiCardHeading);

declare global {
    interface HTMLElementTagNameMap {
        "iai-card-heading": IaiCardHeading;
    }
}
