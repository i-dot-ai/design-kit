import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { selectFixtures, type SelectFieldData } from "../match-govuk-mappings.js";

function field(f: { id: string; label: string; hint?: string; error?: string }, control: string): string {
    return `<iai-form-group${attrs({ class: f.error ? "govuk-form-group--error" : undefined })}><iai-input-label for="${f.id}">${esc(f.label)}</iai-input-label>${
        f.hint ? `<iai-hint id="${f.id}-hint">${esc(f.hint)}</iai-hint>` : ""
    }${f.error ? `<iai-error-message id="${f.id}-error">${esc(f.error)}</iai-error-message>` : ""}${control}</iai-form-group>`;
}

const markup = (f: SelectFieldData) =>
    field(f, `<iai-select${attrs({ id: f.id, name: f.inputName, error: Boolean(f.error), class: f.selectClasses, "aria-describedby": f.describedBy })}>${f.items
        .map((i) => `<option${attrs({ value: i.value, selected: i.selected, disabled: i.disabled })}>${esc(i.text)}</option>`)
        .join("")}</iai-select>`);

describe("Matches govuk fixture shape - Select", () => {
    for (const fixture of selectFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
