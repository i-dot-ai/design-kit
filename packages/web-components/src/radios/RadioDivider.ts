import { upgrade } from "../shared/upgrade";

export class IaiRadioDivider extends HTMLElement {
    connectedCallback() {
        if (!this.hasChildNodes()) this.textContent = "or";
        upgrade(this, "div", ["govuk-radios__divider"]);
    }
}

customElements.define("iai-radio-divider", IaiRadioDivider);

declare global {
    interface HTMLElementTagNameMap {
        "iai-radio-divider": IaiRadioDivider;
    }
}
