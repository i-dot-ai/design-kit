import { upgrade } from "../shared/upgrade";

export class IaiTaskListNameAndHint extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-task-list__name-and-hint"]);
    }
}

customElements.define("iai-task-list-name-and-hint", IaiTaskListNameAndHint);

declare global {
    interface HTMLElementTagNameMap {
        "iai-task-list-name-and-hint": IaiTaskListNameAndHint;
    }
}
