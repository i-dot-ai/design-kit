import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { feedbackFixtures } from "../match-govuk-mappings.js";
import FixtureFeedback from "../examples/FixtureFeedback.svelte";

describe("Matches govuk fixture shape - Feedback", () => {
    for (const fixture of feedbackFixtures()) {
        it(fixture.name, () => {
            const html = renderSvelte(FixtureFeedback as never, {
                classes: fixture.classes,
                titleText: fixture.titleText,
                titleHtml: fixture.titleHtml,
                text: fixture.text,
                html: fixture.html,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
