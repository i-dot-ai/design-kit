import { upgrade } from "../shared/upgrade";

export class IaiCardGroup extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["iai-card-group"]);
    }
}

customElements.define("iai-card-group", IaiCardGroup);

declare global {
    interface HTMLElementTagNameMap {
        "iai-card-group": IaiCardGroup;
    }
}
