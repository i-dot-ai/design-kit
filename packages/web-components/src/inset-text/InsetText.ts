import { upgrade } from "../shared/upgrade";

export class IaiInsetText extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-inset-text"]);
    }
}

customElements.define("iai-inset-text", IaiInsetText);

declare global {
    interface HTMLElementTagNameMap {
        "iai-inset-text": IaiInsetText;
    }
}
