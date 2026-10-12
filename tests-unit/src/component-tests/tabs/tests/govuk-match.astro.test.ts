import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { tabsFixtures } from "../match-govuk-mappings.js";
import FixtureTabs from "../examples/FixtureTabs.astro";

describe("Matches govuk fixture shape - Tabs", () => {
    for (const fixture of tabsFixtures()) {
        it(fixture.name, async () => {
            const html = await renderAstro(FixtureTabs as never, {
                title: fixture.title,
                items: fixture.items,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
