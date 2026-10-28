import { upgrade } from "../shared/upgrade";

export class IaiTaskListStatus extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-task-list__status"]);
    }
}

customElements.define("iai-task-list-status", IaiTaskListStatus);

declare global {
    interface HTMLElementTagNameMap {
        "iai-task-list-status": IaiTaskListStatus;
    }
}
