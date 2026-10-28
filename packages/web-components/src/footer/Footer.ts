import { create, isTag, takeChildren, upgrade } from "../shared/upgrade";

export class IaiFooter extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute("visuallyhiddentitle") ?? "Support links";
        const container = ["govuk-width-container", this.getAttribute("containerclasses")].filter(Boolean).join(" ");
        const nodes = takeChildren(this);
        const links = nodes.filter(isTag("a"));
        const grow = create("div", "govuk-footer__meta-item govuk-footer__meta-item--grow", {}, create("h2", "govuk-visually-hidden", {}, title));
        if (links.length) grow.append(create("ul", "govuk-footer__inline-list", {}, ...links.map((a) => (a.classList.add("govuk-footer__link"), create("li", "govuk-footer__inline-list-item", {}, a)))));
        const custom = create("div", "govuk-footer__meta-custom", {}, "Built by the ", create("a", "govuk-footer__link", { href: "https://ai.gov.uk/" }, "Incubator for Artificial Intelligence"));
        grow.append(custom);
        const rest = nodes.filter((n) => !links.includes(n as HTMLElement));
        upgrade(this, "footer", ["govuk-footer", "iai-footer"], ["visuallyhiddentitle", "containerclasses"]).append(
            create("div", container, {}, create("div", "govuk-footer__meta", {}, grow, create("div", "govuk-footer__meta-item", {}, ...rest))),
        );
    }
}

customElements.define("iai-footer", IaiFooter);

declare global {
    interface HTMLElementTagNameMap {
        "iai-footer": IaiFooter;
    }
}
