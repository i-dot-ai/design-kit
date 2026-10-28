import { upgrade } from "../shared/upgrade";

export class IaiSideNavSubnavList extends HTMLElement {
    connectedCallback() {
        upgrade(this, "ul", ["side-nav__subnav-list"]);
    }
}

customElements.define("iai-side-nav-subnav-list", IaiSideNavSubnavList);

declare global {
    interface HTMLElementTagNameMap {
        "iai-side-nav-subnav-list": IaiSideNavSubnavList;
    }
}
