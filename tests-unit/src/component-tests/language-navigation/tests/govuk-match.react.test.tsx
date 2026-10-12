import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { languageNavigationFixtures } from "../match-govuk-mappings.js";
import { renderLanguageNavigation } from "../examples/language-navigation.react.jsx";

describe("Matches govuk fixture shape - LanguageNavigation", () => {
    for (const fixture of languageNavigationFixtures()) {
        it(fixture.name, () => {
            const html = renderReact(() => renderLanguageNavigation(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
