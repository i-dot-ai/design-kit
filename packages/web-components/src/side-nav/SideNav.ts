import { upgrade } from "../shared/upgrade.js";

export class IaiSideNav extends HTMLElement {
    connectedCallback() {
        upgrade(this, "nav", ["side-nav"]);
    }
}

customElements.define("iai-side-nav", IaiSideNav);

declare global {
    interface HTMLElementTagNameMap {
        "iai-side-nav": IaiSideNav;
    }
}
