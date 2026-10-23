import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { dateInputFixtures, type DateInputData } from "../match-govuk-mappings.js";

const markup = (d: DateInputData) =>
    `<iai-form-group${attrs({ class: d.hasError ? "govuk-form-group--error" : undefined })}><iai-fieldset role="group"${attrs({ "aria-describedby": d.describedBy || undefined })}><iai-fieldset-legend>${esc(d.legend ?? "")}</iai-fieldset-legend>${
        d.hintText !== undefined ? `<iai-hint id="${d.hintId}">${esc(d.hintText)}</iai-hint>` : ""
    }${
        d.errorText !== undefined ? `<iai-error-message id="${d.errorId}">${esc(d.errorText)}</iai-error-message>` : ""
    }<iai-date-input${attrs({ id: d.id })}>${d.items
        .map((i) => `<iai-date-input-item><iai-form-group><iai-input-label class="govuk-date-input__label" for="${i.id}">${esc(i.label)}</iai-input-label><iai-date-input-field${attrs({ id: i.id, name: i.name, class: i.inputClasses, value: i.value })}></iai-date-input-field></iai-form-group></iai-date-input-item>`)
        .join("")}</iai-date-input></iai-fieldset></iai-form-group>`;

describe("Matches govuk fixture shape - DateInput", () => {
    for (const fixture of dateInputFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
