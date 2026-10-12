import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid.jsx";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { taskListFixtures } from "../match-govuk-mappings.js";
import { renderTaskList } from "../examples/task-list.solid.jsx";

describe("Matches govuk fixture shape - TaskList", () => {
    for (const fixture of taskListFixtures()) {
        it(fixture.name, () => {
            const html = renderSolid(() => renderTaskList(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
