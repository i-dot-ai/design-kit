import { upgrade } from "../shared/upgrade";

export class IaiModalTitle extends HTMLElement {
    connectedCallback() {
        upgrade(this, "h2", ["govuk-heading-m iai-modal__title"]);
    }
}

customElements.define("iai-modal-title", IaiModalTitle);

declare global {
    interface HTMLElementTagNameMap {
        "iai-modal-title": IaiModalTitle;
    }
}
