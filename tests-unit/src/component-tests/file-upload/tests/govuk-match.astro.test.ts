import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { fileUploadFixtures } from "../match-govuk-mappings.js";
import FileUploadField from "../examples/FileUploadField.astro";

describe("Matches govuk fixture shape - FileUpload", () => {
    for (const field of fileUploadFixtures()) {
        it(field.name, async () => {
            const html = await renderAstro(FileUploadField as never, { field });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(field.expectedHtml)));
        });
    }
});
