import { describe, it, expect } from "vitest";
import { renderReact } from "../../../render/react.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { panelFixtures } from "../match-govuk-mappings.js";
import { renderPanel } from "../examples/panel.react.jsx";

describe("Matches govuk fixture shape - Panel", () => {
    for (const fixture of panelFixtures()) {
        it(fixture.name, () => {
            const html = renderReact(() => renderPanel(fixture), {});
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
