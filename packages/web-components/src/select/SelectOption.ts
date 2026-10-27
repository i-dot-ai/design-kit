import { upgrade } from "../shared/upgrade.js";

export class IaiSelectOption extends HTMLElement {
    connectedCallback() {
        upgrade(this, "option", []);
    }
}

customElements.define("iai-select-option", IaiSelectOption);

declare global {
    interface HTMLElementTagNameMap {
        "iai-select-option": IaiSelectOption;
    }
}
