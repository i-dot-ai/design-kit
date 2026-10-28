import { upgrade } from "../shared/upgrade";

const SIZES: Record<string, string> = { small: "govuk-table__caption--s", medium: "govuk-table__caption--m", large: "govuk-table__caption--l", xl: "govuk-table__caption--xl" };

export class IaiTableCaption extends HTMLElement {
    connectedCallback() {
        upgrade(this, "caption", ["govuk-table__caption", SIZES[this.getAttribute("size") ?? ""]], ["size"]);
    }
}

customElements.define("iai-table-caption", IaiTableCaption);

declare global {
    interface HTMLElementTagNameMap {
        "iai-table-caption": IaiTableCaption;
    }
}
