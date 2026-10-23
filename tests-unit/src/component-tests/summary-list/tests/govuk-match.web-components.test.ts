import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { summaryListFixtures, type SummaryListData, type ActionData, hiddenSuffix } from "../match-govuk-mappings.js";

const actionLink = (a: ActionData, cardTitle?: string) => {
    const suffix = hiddenSuffix(a.visuallyHiddenText, cardTitle);
    return `<a class="govuk-link" href="${esc(a.href)}">${esc(a.text)}${suffix ? `<span class="govuk-visually-hidden">${esc(suffix)}</span>` : ""}</a>`;
};

const rowActions = (actions: ActionData[], cardTitle?: string) =>
    actions.length > 1
        ? `<iai-summary-list-actions><ul class="govuk-summary-list__actions-list">${actions.map((a) => `<li class="govuk-summary-list__actions-list-item">${actionLink(a, cardTitle)}</li>`).join("")}</ul></iai-summary-list-actions>`
        : `<iai-summary-list-actions>${actionLink(actions[0], cardTitle)}</iai-summary-list-actions>`;

const list = (d: SummaryListData, cardTitle?: string) =>
    `<iai-summary-list${attrs({ noborder: d.noBorder })}>${d.rows
        .map((r) => `<iai-summary-list-row${attrs({ class: r.rowClass })}><iai-summary-list-key>${esc(r.keyText)}</iai-summary-list-key><iai-summary-list-value>${r.valueHtml ?? esc(r.valueText ?? "")}</iai-summary-list-value>${r.actions.length ? rowActions(r.actions, cardTitle) : ""}</iai-summary-list-row>`)
        .join("")}</iai-summary-list>`;

const markup = (d: SummaryListData) => {
    if (!d.card) return list(d);
    const title = d.card.titleText;
    const actions = d.card.actions;
    const cardActions =
        actions.length === 1
            ? `<iai-summary-card-actions single>${actionLink(actions[0], title)}</iai-summary-card-actions>`
            : actions.length > 1
              ? `<iai-summary-card-actions>${actions.map((a) => `<iai-summary-card-action>${actionLink(a, title)}</iai-summary-card-action>`).join("")}</iai-summary-card-actions>`
              : "";
    return `<iai-summary-card><iai-summary-card-title-wrapper><iai-summary-card-title>${d.card.titleHtml ?? esc(title ?? "")}</iai-summary-card-title>${cardActions}</iai-summary-card-title-wrapper><iai-summary-card-content>${list(d, title)}</iai-summary-card-content></iai-summary-card>`;
};

describe("Matches govuk fixture shape - SummaryList", () => {
    for (const fixture of summaryListFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
