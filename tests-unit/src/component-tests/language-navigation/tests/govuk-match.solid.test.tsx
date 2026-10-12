import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid.jsx";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { languageNavigationFixtures } from "../match-govuk-mappings.js";
import { renderLanguageNavigation } from "../examples/language-navigation.solid.jsx";

describe("Matches govuk fixture shape - LanguageNavigation", () => {
    for (const fixture of languageNavigationFixtures()) {
        it(fixture.name, () => {
            const html = renderSolid(() => renderLanguageNavigation(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
