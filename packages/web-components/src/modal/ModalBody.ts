import { upgrade } from "../shared/upgrade.js";

export class IaiModalBody extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["iai-modal__body"]);
    }
}

customElements.define("iai-modal-body", IaiModalBody);

declare global {
    interface HTMLElementTagNameMap {
        "iai-modal-body": IaiModalBody;
    }
}
