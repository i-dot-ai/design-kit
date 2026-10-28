import { upgrade } from "../shared/upgrade";

export class IaiExitThisPage extends HTMLElement {
    connectedCallback() {
        const link = document.createElement("a");
        link.href = this.getAttribute("redirecturl") ?? "https://www.bbc.co.uk/weather";
        link.setAttribute("role", "button");
        link.setAttribute("draggable", "false");
        link.className = "govuk-button govuk-button--warning govuk-exit-this-page__button govuk-js-exit-this-page-button";
        link.setAttribute("data-module", "govuk-button");
        link.rel = "nofollow noreferrer";
        link.append(...this.childNodes);
        if (!link.textContent?.trim()) link.innerHTML = `<span class="govuk-visually-hidden">Emergency</span> Exit this page`;
        upgrade(this, "div", ["govuk-exit-this-page"], ["redirecturl"], { "data-module": "govuk-exit-this-page" }).append(link);
    }
}

customElements.define("iai-exit-this-page", IaiExitThisPage);

declare global {
    interface HTMLElementTagNameMap {
        "iai-exit-this-page": IaiExitThisPage;
    }
}
