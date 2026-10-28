import { upgrade } from "../shared/upgrade";

export class IaiCharacterCount extends HTMLElement {
    connectedCallback() {
        upgrade(this, "textarea", ["govuk-textarea govuk-js-character-count"]);
    }
}

customElements.define("iai-character-count", IaiCharacterCount);

declare global {
    interface HTMLElementTagNameMap {
        "iai-character-count": IaiCharacterCount;
    }
}
