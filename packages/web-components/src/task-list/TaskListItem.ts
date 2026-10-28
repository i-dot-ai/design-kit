import { upgrade } from "../shared/upgrade";

export class IaiTaskListItem extends HTMLElement {
    connectedCallback() {
        upgrade(this, "li", ["govuk-task-list__item", this.hasAttribute("withlink") && "govuk-task-list__item--with-link"], ["withlink"]);
    }
}

customElements.define("iai-task-list-item", IaiTaskListItem);

declare global {
    interface HTMLElementTagNameMap {
        "iai-task-list-item": IaiTaskListItem;
    }
}
