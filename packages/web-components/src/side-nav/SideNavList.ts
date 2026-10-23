import { upgrade } from "../shared/upgrade.js";

export class IaiSideNavList extends HTMLElement {
    connectedCallback() {
        upgrade(this, "ul", ["govuk-list govuk-list--spaced"]);
    }
}

customElements.define("iai-side-nav-list", IaiSideNavList);

declare global {
    interface HTMLElementTagNameMap {
        "iai-side-nav-list": IaiSideNavList;
    }
}
