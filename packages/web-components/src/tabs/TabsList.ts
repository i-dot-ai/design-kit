import { upgrade } from "../shared/upgrade";

export class IaiTabsList extends HTMLElement {
    connectedCallback() {
        upgrade(this, "ul", ["govuk-tabs__list"]);
    }
}

customElements.define("iai-tabs-list", IaiTabsList);

declare global {
    interface HTMLElementTagNameMap {
        "iai-tabs-list": IaiTabsList;
    }
}
