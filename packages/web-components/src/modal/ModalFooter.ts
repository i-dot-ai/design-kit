import { upgrade } from "../shared/upgrade.js";

export class IaiModalFooter extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["iai-modal__footer govuk-button-group"]);
    }
}

customElements.define("iai-modal-footer", IaiModalFooter);

declare global {
    interface HTMLElementTagNameMap {
        "iai-modal-footer": IaiModalFooter;
    }
}
