import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { tabsFixtures, type TabsData } from "../match-govuk-mappings.js";

const markup = (d: TabsData) =>
    `<iai-tabs><iai-tabs-title>${esc(d.title)}</iai-tabs-title><iai-tabs-list>${d.items
        .map((i) => `<iai-tab${attrs({ href: `#${i.id}`, selected: i.selected })}>${esc(i.label)}</iai-tab>`)
        .join("")}</iai-tabs-list>${d.items
        .map((i) => `<iai-tab-panel${attrs({ id: i.id, hidden: !i.selected })}>${i.panelHtml ?? `<p class="govuk-body">${esc(i.panelText ?? "")}</p>`}</iai-tab-panel>`)
        .join("")}</iai-tabs>`;

describe("Matches govuk fixture shape - Tabs", () => {
    for (const fixture of tabsFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
