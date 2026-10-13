import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { fileUploadFixtures } from "../match-govuk-mappings.js";
import FileUploadField from "../examples/FileUploadField.svelte";

describe("Matches govuk fixture shape - FileUpload", () => {
    for (const field of fileUploadFixtures()) {
        it(field.name, () => {
            const html = renderSvelte(FileUploadField as never, { field });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(field.expectedHtml)));
        });
    }
});
