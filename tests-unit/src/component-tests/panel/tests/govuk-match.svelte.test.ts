import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { panelFixtures } from "../match-govuk-mappings.js";
import FixturePanel from "../examples/FixturePanel.svelte";

describe("Matches govuk fixture shape - Panel", () => {
    for (const fixture of panelFixtures()) {
        it(fixture.name, () => {
            const html = renderSvelte(FixturePanel as never, {
                classes: fixture.classes,
                titleText: fixture.titleText,
                titleHtml: fixture.titleHtml,
                text: fixture.text,
                html: fixture.html,
                hasActions: fixture.hasActions,
                actions: fixture.actions,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
