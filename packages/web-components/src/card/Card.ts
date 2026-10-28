import { upgrade } from "../shared/upgrade";

export class IaiCard extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["iai-card", this.hasAttribute("secondary") && "iai-card--secondary"], ["secondary"]);
    }
}

customElements.define("iai-card", IaiCard);

declare global {
    interface HTMLElementTagNameMap {
        "iai-card": IaiCard;
    }
}
