import { describe, it, expect } from "vitest";
import { renderHtml, renderWebComponent, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { paginationFixtures, type ArrowLink, type PaginationData } from "../match-govuk-mappings.js";

const arrow = (kind: "prev" | "next", a: ArrowLink | undefined, block: boolean) =>
    a ? `<iai-pagination-${kind}${attrs({ href: a.href, block, labeltext: a.labelText })}>${esc(a.text ?? "")}</iai-pagination-${kind}>` : "";

const markup = (d: PaginationData) =>
    `<iai-pagination${attrs({ block: d.block })}>${arrow("prev", d.previous, d.block)}${
        d.items.length
            ? `<iai-pagination-list>${d.items
                  .map((i) => (i.ellipsis ? `<iai-pagination-item ellipsis></iai-pagination-item>` : `<iai-pagination-item${attrs({ href: i.href, current: i.current, "aria-label": `Page ${i.number}` })}>${esc(String(i.number))}</iai-pagination-item>`))
                  .join("")}</iai-pagination-list>`
            : ""
    }${arrow("next", d.next, d.block)}</iai-pagination>`;

describe("Matches govuk fixture shape - Pagination", () => {
    for (const fixture of paginationFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
