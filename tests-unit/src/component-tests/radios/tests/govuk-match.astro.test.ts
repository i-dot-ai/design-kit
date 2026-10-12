import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { radiosFixtures } from "../match-govuk-mappings.js";
import RadiosField from "../examples/RadiosField.astro";

describe("Matches govuk fixture shape - Radios", () => {
    for (const data of radiosFixtures()) {
        it(data.name, async () => {
            const html = await renderAstro(RadiosField as never, { data });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(data.expectedHtml)));
        });
    }
});
