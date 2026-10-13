import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { textareaFixtures } from "../match-govuk-mappings.js";
import { renderTextarea } from "../examples/textarea.react.jsx";

describe("Matches govuk fixture shape - Textarea", () => {
    for (const field of textareaFixtures()) {
        it(field.name, () => {
            const html = renderReact(() => renderTextarea(field), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(field.expectedHtml)));
        });
    }
});
