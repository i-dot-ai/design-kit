import { upgrade, wrapContents } from "../shared/upgrade";

export class IaiModal extends HTMLElement {
    connectedCallback() {
        wrapContents(upgrade(this, "dialog", ["iai-modal"], [], { tabindex: "-1", "data-module": "iai-modal" }), "div", "iai-modal__container");
    }
}

customElements.define("iai-modal", IaiModal);

declare global {
    interface HTMLElementTagNameMap {
        "iai-modal": IaiModal;
    }
}
