import { upgrade } from "../shared/upgrade";

export class IaiDetailsText extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-details__text"]);
    }
}

customElements.define("iai-details-text", IaiDetailsText);

declare global {
    interface HTMLElementTagNameMap {
        "iai-details-text": IaiDetailsText;
    }
}
