import { upgrade } from "../shared/upgrade";

export class IaiLink extends HTMLElement {
    connectedCallback() {
        const variant = this.getAttribute("variant");
        upgrade(this, "a", [
            "govuk-link",
            this.hasAttribute("nounderline") && "govuk-link--no-underline",
            this.hasAttribute("novisitedstate") && "govuk-link--no-visited-state",
            (variant === "warning" || variant === "inverse") && `govuk-link--${variant}`,
        ], ["nounderline", "novisitedstate", "variant"]);
    }
}

customElements.define("iai-link", IaiLink);

declare global {
    interface HTMLElementTagNameMap {
        "iai-link": IaiLink;
    }
}
