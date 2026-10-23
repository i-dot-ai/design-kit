import { upgrade, wrapContents } from "../shared/upgrade.js";

export class IaiBreadcrumbs extends HTMLElement {
    connectedCallback() {
        wrapContents(upgrade(this, "nav", ["govuk-breadcrumbs", this.hasAttribute("inverse") && "govuk-breadcrumbs--inverse", this.hasAttribute("collapseonmobile") && "govuk-breadcrumbs--collapse-on-mobile"], ["inverse", "collapseonmobile"], { "aria-label": "Breadcrumb" }), "ol", "govuk-breadcrumbs__list");
    }
}

customElements.define("iai-breadcrumbs", IaiBreadcrumbs);

declare global {
    interface HTMLElementTagNameMap {
        "iai-breadcrumbs": IaiBreadcrumbs;
    }
}
