import { upgrade } from "../shared/upgrade";

export class IaiCheckboxes extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-checkboxes", this.hasAttribute("small") && "govuk-checkboxes--small", this.hasAttribute("subtle") && "govuk-checkboxes--subtle"], ["small", "subtle"], { "data-module": "govuk-checkboxes" });
    }
}

customElements.define("iai-checkboxes", IaiCheckboxes);

declare global {
    interface HTMLElementTagNameMap {
        "iai-checkboxes": IaiCheckboxes;
    }
}
