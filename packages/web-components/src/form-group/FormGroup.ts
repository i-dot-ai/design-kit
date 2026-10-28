import { upgrade } from "../shared/upgrade";

export class IaiFormGroup extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-form-group", this.hasAttribute("inline") && "govuk-form-group--inline"], ["inline"]);
    }
}

customElements.define("iai-form-group", IaiFormGroup);

declare global {
    interface HTMLElementTagNameMap {
        "iai-form-group": IaiFormGroup;
    }
}
