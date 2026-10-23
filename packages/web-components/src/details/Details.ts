import { upgrade } from "../shared/upgrade.js";

export class IaiDetails extends HTMLElement {
    connectedCallback() {
        upgrade(this, "details", ["govuk-details"]);
    }
}

customElements.define("iai-details", IaiDetails);

declare global {
    interface HTMLElementTagNameMap {
        "iai-details": IaiDetails;
    }
}
