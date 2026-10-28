import { upgrade } from "../shared/upgrade";

export class IaiList extends HTMLElement {
    connectedCallback() {
        const numbered = this.hasAttribute("numbered");
        upgrade(this, numbered ? "ol" : "ul", ["govuk-list", numbered && "govuk-list--number", this.hasAttribute("spaced") && "govuk-list--spaced"], ["numbered", "spaced"]);
    }
}

customElements.define("iai-list", IaiList);

declare global {
    interface HTMLElementTagNameMap {
        "iai-list": IaiList;
    }
}
