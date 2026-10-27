import { describe, it, expect } from "vitest";
import { renderHtml, renderWebComponent, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { feedbackFixtures, type FeedbackData } from "../match-govuk-mappings.js";

const markup = (d: FeedbackData) =>
    `<iai-feedback${attrs({ title: d.titleHtml ?? d.titleText, class: d.classes })}>${d.html ?? esc(d.text ?? "")}</iai-feedback>`;

describe("Matches govuk fixture shape - Feedback", () => {
    for (const fixture of feedbackFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
