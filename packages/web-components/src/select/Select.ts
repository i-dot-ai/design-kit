import { upgrade } from "../shared/upgrade.js";

export class IaiSelect extends HTMLElement {
    connectedCallback() {
        upgrade(this, "select", ["govuk-select", this.hasAttribute("subtle") && "govuk-select--subtle", this.hasAttribute("error") && "govuk-select--error"], ["subtle", "error"]);
    }
}

customElements.define("iai-select", IaiSelect);

declare global {
    interface HTMLElementTagNameMap {
        "iai-select": IaiSelect;
    }
}
