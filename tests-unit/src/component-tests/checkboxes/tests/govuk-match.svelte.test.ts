import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { checkboxesFixtures } from "../match-govuk-mappings.js";
import CheckboxesField from "../examples/CheckboxesField.svelte";

describe("Matches govuk fixture shape - Checkboxes", () => {
    for (const data of checkboxesFixtures()) {
        it(data.name, () => {
            const html = renderSvelte(CheckboxesField as never, { data });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(data.expectedHtml)));
        });
    }
});
