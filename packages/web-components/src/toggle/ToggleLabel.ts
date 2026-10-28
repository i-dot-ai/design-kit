import { upgrade } from "../shared/upgrade";

export class IaiToggleLabel extends HTMLElement {
    connectedCallback() {
        upgrade(this, "label", ["govuk-label iai-toggle__label"]);
    }
}

customElements.define("iai-toggle-label", IaiToggleLabel);

declare global {
    interface HTMLElementTagNameMap {
        "iai-toggle-label": IaiToggleLabel;
    }
}
