import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { inputFixtures } from "../match-govuk-mappings.js";
import InputField from "../examples/InputField.svelte";

describe("Matches govuk fixture shape - Input", () => {
    for (const field of inputFixtures()) {
        it(field.name, () => {
            const html = renderSvelte(InputField as never, { field });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(field.expectedHtml)));
        });
    }
});
