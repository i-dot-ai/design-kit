import { upgrade } from "../shared/upgrade.js";

export class IaiTaskListLink extends HTMLElement {
    connectedCallback() {
        upgrade(this, "a", ["govuk-link govuk-task-list__link"]);
    }
}

customElements.define("iai-task-list-link", IaiTaskListLink);

declare global {
    interface HTMLElementTagNameMap {
        "iai-task-list-link": IaiTaskListLink;
    }
}
