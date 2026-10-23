import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { radiosFixtures, type RadiosData, type RadioItemData } from "../match-govuk-mappings.js";

const markupItem = (item: RadioItemData, fieldName: string): string => {
    if ("divider" in item) return `<iai-radio-divider>${esc(item.divider)}</iai-radio-divider>`;
    const input = `<iai-radio-input${attrs({ id: item.id, name: fieldName, value: item.value, checked: item.checked, "data-aria-controls": item.conditionalId, "aria-describedby": item.describedBy })}></iai-radio-input>`;
    const label = `<iai-radio-label for="${item.id}">${item.html ?? esc(item.text ?? "")}</iai-radio-label>`;
    const hint = item.hintId ? `<iai-hint id="${item.hintId}" class="govuk-radios__hint">${esc(item.hintText ?? "")}</iai-hint>` : "";
    const conditional = item.conditionalId
        ? `<iai-radio-conditional id="${item.conditionalId}"${item.conditionalHidden === false ? ' hidden="false"' : ""}>${item.conditionalHtml ?? ""}</iai-radio-conditional>`
        : "";
    return `<iai-radio-item>${input}${label}${hint}</iai-radio-item>${conditional}`;
};

const markup = (d: RadiosData) => {
    const group = `<iai-radios${attrs({ class: d.radiosClasses, "aria-describedby": d.hasFieldset ? undefined : d.fieldsetDescribedBy })}>${d.items.map((i) => markupItem(i, d.fieldName)).join("")}</iai-radios>`;
    const hint = d.hintId ? `<iai-hint id="${d.hintId}">${esc(d.hint ?? "")}</iai-hint>` : "";
    const error = d.errorId ? `<iai-error-message id="${d.errorId}">${esc(d.error ?? "")}</iai-error-message>` : "";
    const legend = d.legend === undefined
        ? ""
        : `<iai-fieldset-legend${attrs({ class: d.legendClasses, ispageheading: d.legendPageHeading })}>${esc(d.legend)}</iai-fieldset-legend>`;
    const inner = d.hasFieldset
        ? `<iai-fieldset${attrs({ "aria-describedby": d.fieldsetDescribedBy })}>${legend}${hint}${error}${group}</iai-fieldset>`
        : `${hint}${error}${group}`;
    const classes = [d.error ? "govuk-form-group--error" : "", d.formGroupClasses ?? ""].filter(Boolean).join(" ");
    return `<iai-form-group${attrs({ class: classes || undefined })}>${inner}</iai-form-group>`;
};

describe("Matches govuk fixture shape - Radios", () => {
    for (const fixture of radiosFixtures()) {
        if (fixture.hasHtmlLabel) continue;
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
