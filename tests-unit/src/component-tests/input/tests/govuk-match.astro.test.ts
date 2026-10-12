import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { inputFixtures } from "../match-govuk-mappings.js";
import InputField from "../examples/InputField.astro";

describe("Matches govuk fixture shape - Input", () => {
    for (const field of inputFixtures()) {
        it(field.name, async () => {
            const html = await renderAstro(InputField as never, { field });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(field.expectedHtml)));
        });
    }
});
