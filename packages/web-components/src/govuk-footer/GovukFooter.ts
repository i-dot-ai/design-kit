import { create, hasContent, isTag, slotted, takeChildren, upgrade } from "../shared/upgrade.js";
import { FOOTER_CROWN, FOOTER_LICENCE_LOGO } from "../shared/icons.js";

export class IaiGovukFooter extends HTMLElement {
    connectedCallback() {
        const keep = ["containerclasses", "visuallyhiddentitle", "nolicence"];
        const container = create("div", ["govuk-width-container", this.getAttribute("containerclasses")].filter(Boolean).join(" "));
        const title = this.getAttribute("visuallyhiddentitle");
        const noLicence = this.hasAttribute("nolicence");
        const nodes = takeChildren(this);
        const sections = nodes.filter(isTag("iai-govuk-footer-section"));
        const metaLinks = nodes.filter(isTag("a"));
        const metaCustom = slotted(nodes, "meta");
        const licence = slotted(nodes, "licence");
        const copyright = slotted(nodes, "copyright");

        container.innerHTML = FOOTER_CROWN;
        if (sections.length) {
            container.append(
                create("div", "govuk-footer__navigation", {}, ...sections.map((s) => {
                    const items = Array.from(s.children).filter(isTag("a"));
                    const columns = s.getAttribute("columns");
                    const section = create("div", `govuk-footer__section govuk-grid-column-${s.getAttribute("width") ?? "full"}`, {}, create("h2", "govuk-footer__heading govuk-heading-m", {}, s.getAttribute("title") ?? ""));
                    if (items.length) section.append(create("ul", ["govuk-footer__list", columns && `govuk-footer__list--columns-${columns}`].filter(Boolean).join(" "), {}, ...items.map((a) => (a.classList.add("govuk-footer__link"), create("li", "govuk-footer__list-item", {}, a)))));
                    return section;
                })),
                create("hr", "govuk-footer__section-break"),
            );
        }

        const grow = create("div", "govuk-footer__meta-item govuk-footer__meta-item--grow");
        if (metaLinks.length || metaCustom || title) {
            grow.append(create("h2", "govuk-visually-hidden", {}, title ?? "Support links"));
            if (metaLinks.length) grow.append(create("ul", "govuk-footer__inline-list", {}, ...metaLinks.map((a) => (a.classList.add("govuk-footer__link"), create("li", "govuk-footer__inline-list-item", {}, a)))));
            if (metaCustom) grow.append(create("div", "govuk-footer__meta-custom", {}, ...metaCustom.childNodes));
        }
        if (!noLicence) {
            const description = create("span", "govuk-footer__licence-description");
            if (licence && hasContent(Array.from(licence.childNodes))) description.append(...licence.childNodes);
            else description.innerHTML = `All content is available under the <a class="govuk-footer__link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">Open Government Licence v3.0</a>, except where otherwise stated`;
            grow.insertAdjacentHTML("beforeend", FOOTER_LICENCE_LOGO);
            grow.append(description);
        }
        const copyrightLink = create("a", "govuk-footer__link govuk-footer__copyright-logo", { href: "https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/" });
        if (copyright && hasContent(Array.from(copyright.childNodes))) copyrightLink.append(...copyright.childNodes);
        else copyrightLink.textContent = "© Crown copyright";

        container.append(create("div", "govuk-footer__meta", {}, grow, create("div", "govuk-footer__meta-item", {}, copyrightLink)));
        upgrade(this, "div", ["govuk-footer"], keep).append(container);
    }
}

customElements.define("iai-govuk-footer", IaiGovukFooter);

declare global {
    interface HTMLElementTagNameMap {
        "iai-govuk-footer": IaiGovukFooter;
    }
}
