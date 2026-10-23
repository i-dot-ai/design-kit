import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { errorSummaryFixtures, type ErrorSummaryData } from "../match-govuk-mappings.js";

const markup = (d: ErrorSummaryData) =>
    `<iai-error-summary><iai-error-summary-title>${esc(d.titleText)}</iai-error-summary-title><iai-error-summary-body>${
        d.descriptionText !== undefined ? `<p>${esc(d.descriptionText)}</p>` : ""
    }${
        d.errorList.length
            ? `<iai-error-summary-list>${d.errorList.map((e) => `<iai-error-summary-item${attrs({ href: e.href })}>${esc(e.text)}</iai-error-summary-item>`).join("")}</iai-error-summary-list>`
            : ""
    }</iai-error-summary-body></iai-error-summary>`;

describe("Matches govuk fixture shape - ErrorSummary", () => {
    for (const fixture of errorSummaryFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
