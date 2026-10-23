import { upgrade } from "../shared/upgrade.js";

export class IaiSideNavTitle extends HTMLElement {
    connectedCallback() {
        upgrade(this, "h2", ["side-nav__title"]);
    }
}

customElements.define("iai-side-nav-title", IaiSideNavTitle);

declare global {
    interface HTMLElementTagNameMap {
        "iai-side-nav-title": IaiSideNavTitle;
    }
}
