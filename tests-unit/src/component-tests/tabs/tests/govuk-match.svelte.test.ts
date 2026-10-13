import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { tabsFixtures } from "../match-govuk-mappings.js";
import FixtureTabs from "../examples/FixtureTabs.svelte";

describe("Matches govuk fixture shape - Tabs", () => {
    for (const fixture of tabsFixtures()) {
        it(fixture.name, () => {
            const html = renderSvelte(FixtureTabs as never, {
                title: fixture.title,
                items: fixture.items,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
