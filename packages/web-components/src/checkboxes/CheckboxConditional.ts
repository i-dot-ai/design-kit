import { upgrade } from "../shared/upgrade";

export class IaiCheckboxConditional extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-checkboxes__conditional", this.getAttribute("hidden") !== "false" && "govuk-checkboxes__conditional--hidden"], ["hidden"]);
    }
}

customElements.define("iai-checkbox-conditional", IaiCheckboxConditional);

declare global {
    interface HTMLElementTagNameMap {
        "iai-checkbox-conditional": IaiCheckboxConditional;
    }
}
