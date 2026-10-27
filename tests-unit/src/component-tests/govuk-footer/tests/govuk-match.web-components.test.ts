import { describe, it, expect } from "vitest";
import { renderHtml, renderWebComponent, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { footerFixtures, type FooterData } from "../match-govuk-mappings.js";

const link = (i: { href?: string; text?: string; attributes?: Record<string, string> }) =>
    `<a${attrs({ href: i.href, ...i.attributes })}>${esc(i.text ?? "")}</a>`;

const rich = (slot: string, v: { text?: string; html?: string } | null | undefined) =>
    v && (v.html || v.text) ? `<span slot="${slot}">${v.html ?? esc(v.text ?? "")}</span>` : "";

const markup = (d: FooterData) =>
    `<iai-govuk-footer${attrs({ nolicence: d.contentLicence === null, visuallyhiddentitle: d.meta?.visuallyHiddenTitle })}>${(d.navigation ?? [])
        .map((n) => `<iai-govuk-footer-section${attrs({ title: n.title, width: n.width, columns: n.columns })}>${(n.items ?? []).filter((i) => i.href && i.text).map(link).join("")}</iai-govuk-footer-section>`)
        .join("")}${(d.meta?.items ?? []).map(link).join("")}${rich("meta", d.meta)}${rich("licence", d.contentLicence)}${rich("copyright", d.copyright)}</iai-govuk-footer>`;

describe("Matches govuk fixture shape - GovukFooter", () => {
    for (const fixture of footerFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
