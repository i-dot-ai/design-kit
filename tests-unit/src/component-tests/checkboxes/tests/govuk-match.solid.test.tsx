/** @jsxImportSource solid-js */
import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid.jsx";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { checkboxesFixtures } from "../match-govuk-mappings.js";
import { renderCheckboxes } from "../examples/checkboxes.solid.jsx";

const REPRESENTATIVE_CONDITIONAL = "with conditional items";

describe("Matches govuk fixture shape - Checkboxes", () => {
    for (const data of checkboxesFixtures()) {
        if (data.hasHtmlLabel) continue;
        if (data.hasConditional && data.name !== REPRESENTATIVE_CONDITIONAL) continue;
        it(data.name, () => {
            const html = renderSolid(() => renderCheckboxes(data), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(data.expectedHtml)));
        });
    }
});
