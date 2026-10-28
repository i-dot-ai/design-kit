import { upgrade } from "../shared/upgrade";

export class IaiCardContent extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["iai-card__content"]);
    }
}

customElements.define("iai-card-content", IaiCardContent);

declare global {
    interface HTMLElementTagNameMap {
        "iai-card-content": IaiCardContent;
    }
}
