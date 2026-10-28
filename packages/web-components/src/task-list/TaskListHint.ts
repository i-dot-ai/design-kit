import { upgrade } from "../shared/upgrade";

export class IaiTaskListHint extends HTMLElement {
    connectedCallback() {
        upgrade(this, "div", ["govuk-task-list__hint"]);
    }
}

customElements.define("iai-task-list-hint", IaiTaskListHint);

declare global {
    interface HTMLElementTagNameMap {
        "iai-task-list-hint": IaiTaskListHint;
    }
}
