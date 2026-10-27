import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { characterCountFixtures, type CharacterCountData } from "../match-govuk-mappings.js";

function markup(d: CharacterCountData): string {
    const label = `<iai-input-label${attrs({ class: d.labelClasses, for: d.id })}>${esc(d.labelText)}</iai-input-label>`;
    return `<iai-form-group${attrs({
        class: [d.hasError && "govuk-form-group--error", "govuk-character-count"].filter(Boolean).join(" "),
        "data-module": "govuk-character-count",
        "data-maxlength": d.maxlength,
        "data-maxwords": d.maxwords,
        "data-threshold": d.threshold,
    })}>${d.isPageHeading ? `<h1 class="govuk-label-wrapper">${label}</h1>` : label}${
        d.hintText !== undefined ? `<iai-hint id="${d.id}-hint">${esc(d.hintText)}</iai-hint>` : ""
    }${d.errorText !== undefined ? `<iai-error-message id="${d.id}-error">${esc(d.errorText)}</iai-error-message>` : ""}<iai-character-count${attrs({
        class: d.hasError ? "govuk-textarea--error" : undefined,
        id: d.id,
        name: d.fieldName,
        rows: d.rows,
        "aria-describedby": d.describedBy,
    })}>${esc(d.value ?? "")}</iai-character-count><iai-character-count-message id="${d.id}-info">${esc(d.countMessage)}</iai-character-count-message></iai-form-group>`;
}

describe("Matches govuk fixture shape - CharacterCount", () => {
    for (const fixture of characterCountFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
