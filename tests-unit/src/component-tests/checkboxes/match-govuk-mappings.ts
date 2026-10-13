import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type CheckboxItemData =
    | { divider: string }
    | {
          id: string;
          value: string;
          itemName: string;
          text?: string;
          html?: string;
          checked?: boolean;
          hintId?: string;
          hintText?: string;
          conditionalId?: string;
          conditionalHtml?: string;
          conditionalHidden?: boolean;
          behaviour?: string;
          describedBy?: string;
      };

export type CheckboxesData = {
    name: string;
    fieldName: string;
    hasFieldset: boolean;
    legend?: string;
    legendClasses?: string;
    legendPageHeading?: boolean;
    hint?: string;
    hintId?: string;
    error?: string;
    errorId?: string;
    formGroupClasses?: string;
    fieldsetDescribedBy?: string;
    checkboxesClasses?: string;
    items: CheckboxItemData[];
    hasHtmlLabel: boolean;
    hasConditional: boolean;
    expectedHtml: string;
};

type FixtureItem = {
    value?: string;
    text?: string;
    html?: string;
    id?: string;
    name?: string;
    checked?: boolean;
    divider?: string;
    behaviour?: string;
    hint?: { text?: string; html?: string };
    conditional?: { html?: string };
};

type CheckboxesOptions = {
    name?: string;
    idPrefix?: string;
    values?: string[];
    classes?: string;
    formGroup?: { classes?: string };
    fieldset?: {
        legend?: { text?: string; classes?: string; isPageHeading?: boolean };
    };
    hint?: { text?: string; html?: string };
    errorMessage?: { text?: string; html?: string };
    items?: FixtureItem[];
};

function itemId(base: string, index: number, explicitId?: string): string {
    if (explicitId) return explicitId;
    return index === 0 ? base : `${base}-${index + 1}`;
}

export function checkboxesFixtures(): CheckboxesData[] {
    return loadFixtures("checkboxes")
        .filter((fixture) => {
            const options = fixture.options as CheckboxesOptions;
            return (
                options.hint?.html === undefined &&
                options.errorMessage?.html === undefined
            );
        })
        .map((fixture) => {
            const options = fixture.options as CheckboxesOptions;
            const base = options.idPrefix ?? options.name ?? "";
            const fieldName = options.name ?? "";
            const hasFieldset = options.fieldset !== undefined;
            const legend = options.fieldset?.legend;
            const hintId = options.hint ? `${base}-hint` : undefined;
            const errorId = options.errorMessage ? `${base}-error` : undefined;
            const values = options.values ?? [];

            const fieldsetDescribedBy = [hintId, errorId]
                .filter(Boolean)
                .join(" ");

            const rawItems = options.items ?? [];
            const items: CheckboxItemData[] = rawItems.filter(Boolean).map((item, index) => {
                if (item.divider !== undefined) {
                    return { divider: item.divider };
                }
                const id = itemId(base, index, item.id);
                const hintId = item.hint ? `${id}-item-hint` : undefined;
                const conditionalId = item.conditional
                    ? `conditional-${id}`
                    : undefined;
                const describedBy = hintId;
                const checked =
                    item.checked === true ||
                    (item.value !== undefined && values.includes(item.value));

                return {
                    id,
                    value: item.value ?? "",
                    itemName: item.name ?? fieldName,
                    text: item.text,
                    html: item.html,
                    checked,
                    hintId,
                    hintText: item.hint?.text,
                    conditionalId,
                    conditionalHtml: item.conditional?.html,
                    conditionalHidden: !checked,
                    behaviour: item.behaviour,
                    describedBy,
                };
            });

            return {
                name: fixture.name,
                fieldName,
                hasFieldset,
                legend: legend?.text,
                legendClasses: legend?.classes,
                legendPageHeading: legend?.isPageHeading,
                hint: options.hint?.text,
                hintId,
                error: options.errorMessage?.text,
                errorId,
                formGroupClasses: options.formGroup?.classes,
                fieldsetDescribedBy: fieldsetDescribedBy || undefined,
                checkboxesClasses: options.classes,
                items,
                hasHtmlLabel: rawItems.filter(Boolean).some((item) => item.html !== undefined),
                hasConditional: rawItems.filter(Boolean).some((item) => item.conditional !== undefined),
                expectedHtml: fixture.html,
            };
        });
}
