import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { characterCountFixtures } from "../match-govuk-mappings.js";
import { renderCharacterCount } from "../examples/character-count.react.jsx";

describe("Matches govuk fixture shape - CharacterCount", () => {
    for (const fixture of characterCountFixtures()) {
        it(fixture.name, () => {
            const html = renderReact(() => renderCharacterCount(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
