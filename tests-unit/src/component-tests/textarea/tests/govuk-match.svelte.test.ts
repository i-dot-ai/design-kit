import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { textareaFixtures } from "../match-govuk-mappings.js";
import TextareaField from "../examples/TextareaField.svelte";

describe("Matches govuk fixture shape - Textarea", () => {
    for (const field of textareaFixtures()) {
        it(field.name, () => {
            const html = renderSvelte(TextareaField as never, { field });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(field.expectedHtml)));
        });
    }
});
