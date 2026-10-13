import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { dateInputFixtures } from "../match-govuk-mappings.js";
import { renderDateInput } from "../examples/date-input.react.jsx";

describe("Matches govuk fixture shape - DateInput", () => {
    for (const fixture of dateInputFixtures()) {
        it(fixture.name, () => {
            const html = renderReact(() => renderDateInput(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
