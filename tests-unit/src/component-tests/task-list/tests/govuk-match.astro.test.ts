import { describe, it, expect } from "vitest";
import { renderAstro } from "../../../render/astro.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { taskListFixtures } from "../match-govuk-mappings.js";
import FixtureTaskList from "../examples/FixtureTaskList.astro";

describe("Matches govuk fixture shape - TaskList", () => {
    for (const fixture of taskListFixtures()) {
        it(fixture.name, async () => {
            const html = await renderAstro(FixtureTaskList as never, {
                idPrefix: fixture.idPrefix,
                items: fixture.items,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
