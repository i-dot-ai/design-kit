import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { detailsFixtures } from "../match-govuk-mappings.js";
import { renderDetails } from "../examples/details.react.jsx";

describe("Matches govuk fixture shape - Details", () => {
    for (const fixture of detailsFixtures()) {
        it(fixture.name, () => {
            const html = renderReact(() => renderDetails(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
