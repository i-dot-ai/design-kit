import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { fieldsetFixtures, type FieldsetData } from "../match-govuk-mappings.js";

const markup = (d: FieldsetData) =>
    `<iai-fieldset><iai-fieldset-legend${attrs({ size: d.size, ispageheading: d.isPageHeading })}>${esc(d.legendText ?? "")}</iai-fieldset-legend></iai-fieldset>`;

describe("Matches govuk fixture shape - Fieldset", () => {
    for (const fixture of fieldsetFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
