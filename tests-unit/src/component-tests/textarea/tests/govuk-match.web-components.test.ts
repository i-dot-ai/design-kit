import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { textareaFixtures, type TextareaFieldData } from "../match-govuk-mappings.js";

function field(f: { id: string; label: string; hint?: string; error?: string }, control: string): string {
    return `<iai-form-group${attrs({ class: f.error ? "govuk-form-group--error" : undefined })}><iai-input-label for="${f.id}">${esc(f.label)}</iai-input-label>${
        f.hint ? `<iai-hint id="${f.id}-hint">${esc(f.hint)}</iai-hint>` : ""
    }${f.error ? `<iai-error-message id="${f.id}-error">${esc(f.error)}</iai-error-message>` : ""}${control}</iai-form-group>`;
}

const markup = (f: TextareaFieldData) =>
    field(f, `<iai-textarea${attrs({ id: f.id, name: f.inputName, rows: f.rows, error: Boolean(f.error), "aria-describedby": f.describedBy, value: f.value })}></iai-textarea>`);

describe("Matches govuk fixture shape - Textarea", () => {
    for (const fixture of textareaFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
