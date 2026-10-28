import { upgrade, wrapWith } from "../shared/upgrade";

export class IaiPasswordInput extends HTMLElement {
    connectedCallback() {
        const button = document.createElement("button");
        button.className = "govuk-button govuk-button--secondary govuk-password-input__toggle govuk-js-password-input-toggle";
        button.type = "button";
        button.hidden = true;
        button.setAttribute("data-module", "govuk-button");
        button.setAttribute("aria-label", "Show password");
        button.append(...this.childNodes);
        if (!button.hasChildNodes()) button.textContent = "Show";
        const input = upgrade(this, "input", ["govuk-input govuk-password-input__input govuk-js-password-input-input"], [], {
            type: "password",
            spellcheck: "false",
            autocomplete: "current-password",
            autocapitalize: "none",
        });
        if (input.id) button.setAttribute("aria-controls", input.id);
        wrapWith(input, "div", "govuk-input__wrapper govuk-password-input__wrapper").append(button);
    }
}

customElements.define("iai-password-input", IaiPasswordInput);

declare global {
    interface HTMLElementTagNameMap {
        "iai-password-input": IaiPasswordInput;
    }
}
