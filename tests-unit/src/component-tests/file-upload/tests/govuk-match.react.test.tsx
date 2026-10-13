import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { fileUploadFixtures } from "../match-govuk-mappings.js";
import { renderFileUpload } from "../examples/file-upload.react.jsx";

describe("Matches govuk fixture shape - FileUpload", () => {
    for (const field of fileUploadFixtures()) {
        it(field.name, () => {
            const html = renderReact(() => renderFileUpload(field), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(field.expectedHtml)));
        });
    }
});
