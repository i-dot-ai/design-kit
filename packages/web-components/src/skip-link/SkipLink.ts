import { upgrade } from "../shared/upgrade.js";

export class IaiSkipLink extends HTMLElement {
    connectedCallback() {
        upgrade(this, "a", ["govuk-skip-link"], [], { "data-module": "govuk-skip-link" });
    }
}

customElements.define("iai-skip-link", IaiSkipLink);

declare global {
    interface HTMLElementTagNameMap {
        "iai-skip-link": IaiSkipLink;
    }
}
