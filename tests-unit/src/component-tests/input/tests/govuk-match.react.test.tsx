import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { inputFixtures } from "../match-govuk-mappings.js";
import { renderInput } from "../examples/input.react.jsx";

describe("Matches govuk fixture shape - Input", () => {
    for (const field of inputFixtures()) {
        it(field.name, () => {
            const html = renderReact(() => renderInput(field), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(field.expectedHtml)));
        });
    }
});
