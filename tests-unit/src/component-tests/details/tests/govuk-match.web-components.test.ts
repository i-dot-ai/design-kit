import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { detailsFixtures, type DetailsData } from "../match-govuk-mappings.js";

const markup = (d: DetailsData) =>
    `<iai-details${attrs({ id: d.id, open: d.open })}><iai-details-summary>${esc(d.summaryText ?? "")}</iai-details-summary><iai-details-text>${d.html ?? esc(d.text ?? "")}</iai-details-text></iai-details>`;

describe("Matches govuk fixture shape - Details", () => {
    for (const fixture of detailsFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
