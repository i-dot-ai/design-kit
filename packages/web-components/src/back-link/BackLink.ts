import { upgrade } from "../shared/upgrade.js";

export class IaiBackLink extends HTMLElement {
    connectedCallback() {
        upgrade(this, "a", ["govuk-back-link", this.hasAttribute("inverse") && "govuk-back-link--inverse"], ["inverse"]);
    }
}

customElements.define("iai-back-link", IaiBackLink);

declare global {
    interface HTMLElementTagNameMap {
        "iai-back-link": IaiBackLink;
    }
}
