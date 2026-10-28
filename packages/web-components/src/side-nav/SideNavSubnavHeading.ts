import { upgrade } from "../shared/upgrade";

export class IaiSideNavSubnavHeading extends HTMLElement {
    connectedCallback() {
        upgrade(this, "h3", ["side-nav__section-heading"]);
    }
}

customElements.define("iai-side-nav-subnav-heading", IaiSideNavSubnavHeading);

declare global {
    interface HTMLElementTagNameMap {
        "iai-side-nav-subnav-heading": IaiSideNavSubnavHeading;
    }
}
