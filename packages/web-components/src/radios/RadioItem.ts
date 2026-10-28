import { upgrade } from "../shared/upgrade";

export class IaiRadioItem extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-radios__item"]);
    }
}

customElements.define("iai-radio-item", IaiRadioItem);

declare global {
    interface HTMLElementTagNameMap {
        "iai-radio-item": IaiRadioItem;
    }
}
