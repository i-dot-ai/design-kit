/** @jsxImportSource solid-js */
import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid.jsx";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { selectFixtures } from "../match-govuk-mappings.js";
import { renderSelect } from "../examples/select.solid.jsx";

describe("Matches govuk fixture shape - Select", () => {
    for (const field of selectFixtures()) {
        it(field.name, () => {
            const html = renderSolid(() => renderSelect(field), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(field.expectedHtml)));
        });
    }
});
