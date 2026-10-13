import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { taskListFixtures } from "../match-govuk-mappings.js";
import FixtureTaskList from "../examples/FixtureTaskList.svelte";

describe("Matches govuk fixture shape - TaskList", () => {
    for (const fixture of taskListFixtures()) {
        it(fixture.name, () => {
            const html = renderSvelte(FixtureTaskList as never, {
                idPrefix: fixture.idPrefix,
                items: fixture.items,
            });
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
