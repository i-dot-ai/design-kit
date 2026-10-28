import { upgrade } from "../shared/upgrade";

export class IaiRadioConditional extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-radios__conditional", this.getAttribute("hidden") !== "false" && "govuk-radios__conditional--hidden"], ["hidden"]);
    }
}

customElements.define("iai-radio-conditional", IaiRadioConditional);

declare global {
    interface HTMLElementTagNameMap {
        "iai-radio-conditional": IaiRadioConditional;
    }
}
