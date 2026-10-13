import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { checkboxesFixtures } from "../match-govuk-mappings.js";
import { renderCheckboxes } from "../examples/checkboxes.react.jsx";

const REPRESENTATIVE_CONDITIONAL = "with conditional items";

describe("Matches govuk fixture shape - Checkboxes", () => {
    for (const data of checkboxesFixtures()) {
        if (data.hasHtmlLabel) continue;
        if (data.hasConditional && data.name !== REPRESENTATIVE_CONDITIONAL) continue;
        it(data.name, () => {
            const html = renderReact(() => renderCheckboxes(data), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(data.expectedHtml)));
        });
    }
});
