import { upgrade } from "../shared/upgrade.js";

export class IaiRadios extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-radios", this.hasAttribute("inline") && "govuk-radios--inline", this.hasAttribute("small") && "govuk-radios--small"], ["inline", "small"], { "data-module": "govuk-radios" });
    }
}

customElements.define("iai-radios", IaiRadios);

declare global {
    interface HTMLElementTagNameMap {
        "iai-radios": IaiRadios;
    }
}
