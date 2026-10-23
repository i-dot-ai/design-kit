import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { breadcrumbsFixtures, type BreadcrumbsData } from "../match-govuk-mappings.js";

const markup = (d: BreadcrumbsData) =>
    `<iai-breadcrumbs${attrs({ inverse: d.inverse, collapseonmobile: d.collapseOnMobile })}>${d.items
        .map((i) => `<iai-breadcrumb-item${attrs({ href: i.href })}>${esc(i.text ?? "")}</iai-breadcrumb-item>`)
        .join("")}</iai-breadcrumbs>`;

describe("Matches govuk fixture shape - Breadcrumbs", () => {
    for (const fixture of breadcrumbsFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
