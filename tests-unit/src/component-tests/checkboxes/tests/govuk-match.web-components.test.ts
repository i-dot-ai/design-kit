import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { checkboxesFixtures, type CheckboxesData, type CheckboxItemData } from "../match-govuk-mappings.js";

const markupItem = (item: CheckboxItemData): string => {
    if ("divider" in item) return `<iai-checkbox-divider>${esc(item.divider)}</iai-checkbox-divider>`;
    const input = `<iai-checkbox-input${attrs({ id: item.id, name: item.itemName, value: item.value, checked: item.checked, "data-aria-controls": item.conditionalId, "data-behaviour": item.behaviour, "aria-describedby": item.describedBy })}></iai-checkbox-input>`;
    const label = `<iai-checkbox-label for="${item.id}">${item.html ?? esc(item.text ?? "")}</iai-checkbox-label>`;
    const hint = item.hintId ? `<iai-hint id="${item.hintId}" class="govuk-checkboxes__hint">${esc(item.hintText ?? "")}</iai-hint>` : "";
    const conditional = item.conditionalId
        ? `<iai-checkbox-conditional id="${item.conditionalId}"${item.conditionalHidden === false ? ' hidden="false"' : ""}>${item.conditionalHtml ?? ""}</iai-checkbox-conditional>`
        : "";
    return `<iai-checkbox-item>${input}${label}${hint}</iai-checkbox-item>${conditional}`;
};

const markup = (d: CheckboxesData) => {
    const group = `<iai-checkboxes${attrs({ class: d.checkboxesClasses, "aria-describedby": d.hasFieldset ? undefined : d.fieldsetDescribedBy })}>${d.items.map((i) => markupItem(i)).join("")}</iai-checkboxes>`;
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

describe("Matches govuk fixture shape - Checkboxes", () => {
    for (const fixture of checkboxesFixtures()) {
        if (fixture.hasHtmlLabel) continue;
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
