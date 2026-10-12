import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { selectFixtures } from "../match-govuk-mappings.js";
import { renderSelect } from "../examples/select.react.jsx";

describe("Matches govuk fixture shape - Select", () => {
    for (const field of selectFixtures()) {
        it(field.name, () => {
            const html = renderReact(() => renderSelect(field), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(field.expectedHtml)));
        });
    }
});
