import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { panelFixtures, type PanelData, type PanelAction } from "../match-govuk-mappings.js";

const action = (a: PanelAction) =>
    a.href && a.type !== "button"
        ? `<a class="govuk-link govuk-link--inverse" href="${esc(a.href)}">${esc(a.text)}</a>`
        : `<button${attrs({ type: a.type ?? "button", ...(a.attributes ?? {}) })} class="govuk-button govuk-button--inverse" data-module="govuk-button">${esc(a.text)}</button>`;

const markup = (d: PanelData) => {
    const body = d.html || d.text ? `<iai-panel-body>${d.html ?? esc(d.text ?? "")}</iai-panel-body>` : "";
    const actions = d.hasActions
        ? `<iai-panel-actions>${d.actions.length ? `<div class="govuk-button-group">${d.actions.map(action).join("")}</div>` : ""}</iai-panel-actions>`
        : "";
    return `<iai-panel${attrs({ class: d.classes })}><iai-panel-title>${d.titleHtml ?? esc(d.titleText ?? "")}</iai-panel-title>${body}${actions}</iai-panel>`;
};

describe("Matches govuk fixture shape - Panel", () => {
    for (const fixture of panelFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
