import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { radiosFixtures } from "../match-govuk-mappings.js";
import { renderRadios } from "../examples/radios.react.jsx";

// React can't inject raw HTML unwrapped, so html-label fixtures are skipped, and
// only one representative conditional-reveal fixture is hand-authored (see the
// example) to exercise RadioConditional. Svelte/Astro cover the rest.
const REPRESENTATIVE_CONDITIONAL = "with conditional items";

describe("Matches govuk fixture shape - Radios", () => {
    for (const data of radiosFixtures()) {
        if (data.hasHtmlLabel) continue;
        if (data.hasConditional && data.name !== REPRESENTATIVE_CONDITIONAL) continue;
        it(data.name, () => {
            const html = renderReact(() => renderRadios(data), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(data.expectedHtml)));
        });
    }
});
