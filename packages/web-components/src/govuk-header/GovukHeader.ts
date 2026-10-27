import { create, upgrade } from "../shared/upgrade.js";
import { GOVUK_LOGOTYPE } from "../shared/icons.js";

export class IaiGovukHeader extends HTMLElement {
    connectedCallback() {
        const productName = this.getAttribute("productname");
        const container = this.getAttribute("containerclasses") ?? "govuk-width-container";
        const link = create("a", "govuk-header__homepage-link", { href: this.getAttribute("homepageurl") ?? "//gov.uk" });
        link.innerHTML = GOVUK_LOGOTYPE;
        if (productName) link.append(create("span", "govuk-header__product-name", {}, productName));
        const root = upgrade(this, "div", ["govuk-header"], ["homepageurl", "productname", "containerclasses"]);
        root.replaceChildren(create("div", ["govuk-header__container", container].filter(Boolean).join(" "), {}, create("div", "govuk-header__logo", {}, link)));
    }
}

customElements.define("iai-govuk-header", IaiGovukHeader);

declare global {
    interface HTMLElementTagNameMap {
        "iai-govuk-header": IaiGovukHeader;
    }
}
