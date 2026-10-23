import { upgrade } from "../shared/upgrade.js";

export class IaiTextarea extends HTMLElement {
    connectedCallback() {
        const value = this.getAttribute("value");
        const textarea = upgrade(this, "textarea", [
            "govuk-textarea",
            this.hasAttribute("error") && "govuk-textarea--error",
            this.hasAttribute("subtle") && "govuk-textarea--subtle",
        ], ["error", "subtle", "value"]);
        if (value !== null) textarea.textContent = value;
    }
}

customElements.define("iai-textarea", IaiTextarea);

declare global {
    interface HTMLElementTagNameMap {
        "iai-textarea": IaiTextarea;
    }
}
