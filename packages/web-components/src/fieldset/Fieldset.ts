import { upgrade } from "../shared/upgrade";

export class IaiFieldset extends HTMLElement {
    connectedCallback() {
        upgrade(this, "fieldset", ["govuk-fieldset"]);
    }
}

customElements.define("iai-fieldset", IaiFieldset);

declare global {
    interface HTMLElementTagNameMap {
        "iai-fieldset": IaiFieldset;
    }
}
