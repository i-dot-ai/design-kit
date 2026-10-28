import { upgrade } from "../shared/upgrade";

export class IaiListItem extends HTMLElement {
    connectedCallback() {
        upgrade(this, "li", ["govuk-list-item"]);
    }
}

customElements.define("iai-list-item", IaiListItem);

declare global {
    interface HTMLElementTagNameMap {
        "iai-list-item": IaiListItem;
    }
}
