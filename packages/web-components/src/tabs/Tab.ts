import { upgrade, wrapWith } from "../shared/upgrade";

export class IaiTab extends HTMLElement {
    connectedCallback() {
        const selected = this.hasAttribute("selected");
        wrapWith(upgrade(this, "a", ["govuk-tabs__tab"], ["selected"]), "li", selected ? "govuk-tabs__list-item govuk-tabs__list-item--selected" : "govuk-tabs__list-item");
    }
}

customElements.define("iai-tab", IaiTab);

declare global {
    interface HTMLElementTagNameMap {
        "iai-tab": IaiTab;
    }
}
