/** @jsxImportSource solid-js */
import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid.jsx";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { radiosFixtures } from "../match-govuk-mappings.js";
import { renderRadios } from "../examples/radios.solid.jsx";

const REPRESENTATIVE_CONDITIONAL = "with conditional items";

describe("Matches govuk fixture shape - Radios", () => {
    for (const data of radiosFixtures()) {
        if (data.hasHtmlLabel) continue;
        if (data.hasConditional && data.name !== REPRESENTATIVE_CONDITIONAL) continue;
        it(data.name, () => {
            const html = renderSolid(() => renderRadios(data), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(data.expectedHtml)));
        });
    }
});
