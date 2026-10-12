import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { selectFixtures } from "../match-govuk-mappings.js";
import SelectField from "../examples/SelectField.svelte";

describe("Matches govuk fixture shape - Select", () => {
    for (const field of selectFixtures()) {
        it(field.name, () => {
            const html = renderSvelte(SelectField as never, { field });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(field.expectedHtml)));
        });
    }
});
