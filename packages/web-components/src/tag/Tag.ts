import { upgrade } from "../shared/upgrade";

const COLOURS = new Set(["grey", "green", "teal", "turquoise", "blue", "light-blue", "purple", "magenta", "pink", "red", "orange", "yellow"]);

export class IaiTag extends HTMLElement {
    connectedCallback() {
        const colour = this.getAttribute("colour");
        upgrade(this, "strong", ["govuk-tag", colour && COLOURS.has(colour) && `govuk-tag--${colour}`], ["colour"]);
    }
}

customElements.define("iai-tag", IaiTag);

declare global {
    interface HTMLElementTagNameMap {
        "iai-tag": IaiTag;
    }
}
