import { upgrade } from "../shared/upgrade.js";

export class IaiTabs extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-tabs"], [], { "data-module": "govuk-tabs" });
    }
}

customElements.define("iai-tabs", IaiTabs);

declare global {
    interface HTMLElementTagNameMap {
        "iai-tabs": IaiTabs;
    }
}
