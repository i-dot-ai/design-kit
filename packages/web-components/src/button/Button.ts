import { upgrade } from "../shared/upgrade.js";

const MODIFIERS = ["secondary", "warning", "inverse", "tertiary", "small"];
const START_ICON = `<svg class="govuk-button__start-icon" xmlns="http://www.w3.org/2000/svg" width="17.5" height="19" viewBox="0 0 33 40" aria-hidden="true" focusable="false"><path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" /></svg>`;

export class IaiButton extends HTMLElement {
    connectedCallback() {
        const isLink = this.hasAttribute("href");
        const start = this.hasAttribute("startbutton");
        const el = upgrade(
            this,
            isLink ? "a" : "button",
            ["govuk-button", ...MODIFIERS.map((m) => this.hasAttribute(m) && `govuk-button--${m}`), start && "govuk-button--start"],
            [...MODIFIERS, "startbutton", ...(isLink ? ["type"] : [])],
            isLink ? { role: "button", draggable: "false", "data-module": "govuk-button" } : { type: "submit", "data-module": "govuk-button" },
        );
        if (start) el.insertAdjacentHTML("beforeend", START_ICON);
    }
}

customElements.define("iai-button", IaiButton);

declare global {
    interface HTMLElementTagNameMap {
        "iai-button": IaiButton;
    }
}
