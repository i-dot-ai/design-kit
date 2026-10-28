import { upgrade, wrapContents } from "../shared/upgrade";

export class IaiWarningText extends HTMLElement {
    connectedCallback() {
        const div = upgrade(this, "div", ["govuk-warning-text"]);
        const strong = wrapContents(div, "strong", "govuk-warning-text__text");
        strong.insertAdjacentHTML("afterbegin", `<span class="govuk-visually-hidden">Warning</span>`);
        div.insertAdjacentHTML("afterbegin", `<span class="govuk-warning-text__icon" aria-hidden="true">!</span>`);
    }
}

customElements.define("iai-warning-text", IaiWarningText);

declare global {
    interface HTMLElementTagNameMap {
        "iai-warning-text": IaiWarningText;
    }
}
