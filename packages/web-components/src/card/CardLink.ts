import { upgrade } from "../shared/upgrade.js";

export class IaiCardLink extends HTMLElement {
    connectedCallback() {
        upgrade(this, "a", ["iai-card__link"]);
    }
}

customElements.define("iai-card-link", IaiCardLink);

declare global {
    interface HTMLElementTagNameMap {
        "iai-card-link": IaiCardLink;
    }
}
