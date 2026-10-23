import { upgrade } from "../shared/upgrade.js";

export class IaiHint extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-hint"]);
    }
}

customElements.define("iai-hint", IaiHint);

declare global {
    interface HTMLElementTagNameMap {
        "iai-hint": IaiHint;
    }
}
