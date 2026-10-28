import { upgrade } from "../shared/upgrade";

export class IaiButtonGroup extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-button-group"]);
    }
}

customElements.define("iai-button-group", IaiButtonGroup);

declare global {
    interface HTMLElementTagNameMap {
        "iai-button-group": IaiButtonGroup;
    }
}
