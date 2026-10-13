import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { radiosFixtures } from "../match-govuk-mappings.js";
import RadiosField from "../examples/RadiosField.svelte";

describe("Matches govuk fixture shape - Radios", () => {
    for (const data of radiosFixtures()) {
        it(data.name, () => {
            const html = renderSvelte(RadiosField as never, { data });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(data.expectedHtml)));
        });
    }
});
