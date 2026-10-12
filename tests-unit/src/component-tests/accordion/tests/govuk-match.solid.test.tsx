/** @jsxImportSource solid-js */
import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid.jsx";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { accordionFixtures } from "../match-govuk-mappings.js";
import { renderAccordion } from "../examples/accordion.solid.jsx";

describe("Matches govuk fixture shape - Accordion", () => {
    for (const fixture of accordionFixtures()) {
        it(fixture.name, () => {
            const html = renderSolid(() => renderAccordion(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
