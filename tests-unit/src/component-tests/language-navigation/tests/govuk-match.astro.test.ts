import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { languageNavigationFixtures } from "../match-govuk-mappings.js";
import FixtureLanguageNavigation from "../examples/FixtureLanguageNavigation.astro";

describe("Matches govuk fixture shape - LanguageNavigation", () => {
    for (const fixture of languageNavigationFixtures()) {
        it(fixture.name, async () => {
            const html = await renderAstro(FixtureLanguageNavigation as never, {
                ariaLabel: fixture.ariaLabel,
                classes: fixture.classes,
                attributes: fixture.attributes,
                items: fixture.items,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
