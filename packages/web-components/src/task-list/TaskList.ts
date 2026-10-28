import { upgrade } from "../shared/upgrade";

export class IaiTaskList extends HTMLElement {
    connectedCallback() {
        upgrade(this, "ul", ["govuk-task-list"]);
    }
}

customElements.define("iai-task-list", IaiTaskList);

declare global {
    interface HTMLElementTagNameMap {
        "iai-task-list": IaiTaskList;
    }
}
