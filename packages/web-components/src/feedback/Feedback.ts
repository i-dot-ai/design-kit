import { create, hasContent, takeChildren, upgrade } from "../shared/upgrade";

export class IaiFeedback extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute("title") ?? "";
        const body = takeChildren(this);
        const column = create("div", "govuk-grid-column-two-thirds", {}, create("h2", "govuk-feedback__title", {}, title));
        if (hasContent(body)) column.append(create("div", "govuk-feedback__body", {}, ...body));
        upgrade(this, "div", ["govuk-feedback govuk-width-container"], ["title"]).append(create("div", "govuk-grid-row", {}, column));
    }
}

customElements.define("iai-feedback", IaiFeedback);

declare global {
    interface HTMLElementTagNameMap {
        "iai-feedback": IaiFeedback;
    }
}
