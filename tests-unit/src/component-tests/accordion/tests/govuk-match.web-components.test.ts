import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { accordionFixtures, type AccordionData, type SectionData } from "../match-govuk-mappings.js";

const section = (s: SectionData) =>
    `<iai-accordion-section${attrs({ class: s.expanded ? "govuk-accordion__section--expanded" : undefined })}><iai-accordion-section-header><iai-accordion-section-heading id="${s.headingId}">${esc(s.heading)}</iai-accordion-section-heading>${
        s.summaryId ? `<iai-accordion-section-summary id="${s.summaryId}">${s.summaryHtml ?? esc(s.summaryText ?? "")}</iai-accordion-section-summary>` : ""
    }</iai-accordion-section-header><iai-accordion-section-content id="${s.contentId}">${
        s.contentHtml ?? `<p class="govuk-body">${esc(s.contentText ?? "")}</p>`
    }</iai-accordion-section-content></iai-accordion-section>`;

const markup = (d: AccordionData) => `<iai-accordion id="${d.id}">${d.sections.map(section).join("")}</iai-accordion>`;

describe("Matches govuk fixture shape - Accordion", () => {
    for (const fixture of accordionFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
