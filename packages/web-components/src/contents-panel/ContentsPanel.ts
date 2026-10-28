import { upgrade } from "../shared/upgrade";

export class IaiContentsPanel extends HTMLElement {
    connectedCallback() {
        const id = this.getAttribute("headingid") ?? "contents-panel-heading";
        const heading = document.createElement("h2");
        heading.className = "govuk-visually-hidden";
        heading.id = id;
        heading.textContent = this.getAttribute("heading") ?? "Pages in this section";
        upgrade(this, "nav", ["contents-panel"], ["heading", "headingid"], { "aria-labelledby": id }).prepend(heading);
    }
}

customElements.define("iai-contents-panel", IaiContentsPanel);

declare global {
    interface HTMLElementTagNameMap {
        "iai-contents-panel": IaiContentsPanel;
    }
}
