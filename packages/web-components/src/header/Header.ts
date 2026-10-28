import { create, takeChildren, upgrade } from "../shared/upgrade";

export class IaiHeader extends HTMLElement {
    connectedCallback() {
        const href = this.getAttribute("href");
        const container = this.getAttribute("containerclasses") || "govuk-width-container";
        const link = create("a", "govuk-generic-header__homepage-link", href === null ? {} : { href }, ...takeChildren(this));
        upgrade(this, "div", ["govuk-generic-header"], ["href", "containerclasses"]).append(
            create("div", `govuk-generic-header__container ${container}`, {}, create("div", "govuk-generic-header__logo", {}, link)),
        );
    }
}

customElements.define("iai-header", IaiHeader);

declare global {
    interface HTMLElementTagNameMap {
        "iai-header": IaiHeader;
    }
}
