import { upgrade } from "../shared/upgrade.js";

export class IaiToggle extends HTMLElement {
    connectedCallback() {
        upgrade(this, "input", ["iai-toggle__input"], [], { type: "checkbox", role: "switch" });
    }
}

customElements.define("iai-toggle", IaiToggle);

declare global {
    interface HTMLElementTagNameMap {
        "iai-toggle": IaiToggle;
    }
}
