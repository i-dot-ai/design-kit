import { upgrade } from "../shared/upgrade.js";

export class IaiErrorMessage extends HTMLElement {
    connectedCallback() {
        const hidden = this.getAttribute("visuallyhiddentext") ?? "Error";
        const p = upgrade(this, "p", ["govuk-error-message"], ["visuallyhiddentext"]);
        if (hidden) {
            const span = document.createElement("span");
            span.className = "govuk-visually-hidden";
            span.textContent = `${hidden}:`;
            p.prepend(span, " ");
        }
    }
}

customElements.define("iai-error-message", IaiErrorMessage);

declare global {
    interface HTMLElementTagNameMap {
        "iai-error-message": IaiErrorMessage;
    }
}
