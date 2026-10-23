import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { tableFixtures, type TableData } from "../match-govuk-mappings.js";

const markup = (d: TableData) => {
    const cell = (c: { text: string; numeric: boolean }, header: boolean, scope?: string) =>
        header
            ? `<iai-table-header${attrs({ numeric: c.numeric, scope })}>${esc(c.text)}</iai-table-header>`
            : `<iai-table-cell${attrs({ numeric: c.numeric })}>${esc(c.text)}</iai-table-cell>`;
    const caption = d.caption ? `<iai-table-caption${attrs({ size: d.captionSize })}>${esc(d.caption)}</iai-table-caption>` : "";
    const head = d.head ? `<iai-table-head><iai-table-row>${d.head.map((c) => cell(c, true)).join("")}</iai-table-row></iai-table-head>` : "";
    const rows = d.rows
        .map((row) => `<iai-table-row>${row.map((c, i) => (d.firstCellIsHeader && i === 0 ? cell({ ...c, numeric: false }, true, "row") : cell(c, false))).join("")}</iai-table-row>`)
        .join("");
    return `<iai-table>${caption}${head}<iai-table-body>${rows}</iai-table-body></iai-table>`;
};

describe("Matches govuk fixture shape - Table", () => {
    for (const fixture of tableFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
