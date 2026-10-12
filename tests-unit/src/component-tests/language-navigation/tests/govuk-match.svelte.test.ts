import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { languageNavigationFixtures } from "../match-govuk-mappings.js";
import FixtureLanguageNavigation from "../examples/FixtureLanguageNavigation.svelte";

describe("Matches govuk fixture shape - LanguageNavigation", () => {
    for (const fixture of languageNavigationFixtures()) {
        it(fixture.name, () => {
            const html = renderSvelte(FixtureLanguageNavigation as never, {
                ariaLabel: fixture.ariaLabel,
                classes: fixture.classes,
                attributes: fixture.attributes,
                items: fixture.items,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
