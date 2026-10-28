import { upgrade } from "../shared/upgrade";

export class IaiCharacterCountMessage extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-hint govuk-character-count__message"]);
    }
}

customElements.define("iai-character-count-message", IaiCharacterCountMessage);

declare global {
    interface HTMLElementTagNameMap {
        "iai-character-count-message": IaiCharacterCountMessage;
    }
}
