import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid.jsx";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { tabsFixtures } from "../match-govuk-mappings.js";
import { renderTabs } from "../examples/tabs.solid.jsx";

describe("Matches govuk fixture shape - Tabs", () => {
    for (const fixture of tabsFixtures()) {
        it(fixture.name, () => {
            const html = renderSolid(() => renderTabs(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
