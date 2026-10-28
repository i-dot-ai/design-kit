import { upgrade } from "../shared/upgrade";

export class IaiCheckboxItem extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-checkboxes__item"]);
    }
}

customElements.define("iai-checkbox-item", IaiCheckboxItem);

declare global {
    interface HTMLElementTagNameMap {
        "iai-checkbox-item": IaiCheckboxItem;
    }
}
