import { upgrade } from "../shared/upgrade.js";

export class IaiFileUpload extends HTMLElement {
    connectedCallback() {
        upgrade(this, "input", ["govuk-file-upload"], [], { type: "file" });
    }
}

customElements.define("iai-file-upload", IaiFileUpload);

declare global {
    interface HTMLElementTagNameMap {
        "iai-file-upload": IaiFileUpload;
    }
}
