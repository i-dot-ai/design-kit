import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { selectFixtures } from "../match-govuk-mappings.js";
import SelectField from "../examples/SelectField.astro";

describe("Matches govuk fixture shape - Select", () => {
    for (const field of selectFixtures()) {
        it(field.name, async () => {
            const html = await renderAstro(SelectField as never, { field });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(field.expectedHtml)));
        });
    }
});
