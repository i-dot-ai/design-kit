/** @jsxImportSource solid-js */
import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid.jsx";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { textareaFixtures } from "../match-govuk-mappings.js";
import { renderTextarea } from "../examples/textarea.solid.jsx";

describe("Matches govuk fixture shape - Textarea", () => {
    for (const field of textareaFixtures()) {
        it(field.name, () => {
            const html = renderSolid(() => renderTextarea(field), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(field.expectedHtml)));
        });
    }
});
