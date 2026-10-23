import { upgrade } from "../shared/upgrade.js";

export class IaiDateInputItem extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-date-input__item"]);
    }
}

customElements.define("iai-date-input-item", IaiDateInputItem);

declare global {
    interface HTMLElementTagNameMap {
        "iai-date-input-item": IaiDateInputItem;
    }
}
