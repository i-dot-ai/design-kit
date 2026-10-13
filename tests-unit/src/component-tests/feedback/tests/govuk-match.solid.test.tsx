import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid.jsx";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { feedbackFixtures } from "../match-govuk-mappings.js";
import { renderFeedback } from "../examples/feedback.solid.jsx";

describe("Matches govuk fixture shape - Feedback", () => {
    for (const fixture of feedbackFixtures()) {
        it(fixture.name, () => {
            const html = renderSolid(() => renderFeedback(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
