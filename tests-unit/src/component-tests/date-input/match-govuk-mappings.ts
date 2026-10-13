import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type ResolvedItem = {
    id: string;
    name: string;
    label: string;
    value?: string;
    /** The `govuk-input--width-N` class (or a custom width from item.classes). */
    inputClasses: string;
};

export type DateInputData = {
    name: string;
    id: string;
    legend?: string;
    hintId?: string;
    hintText?: string;
    errorId?: string;
    errorText?: string;
    hasError: boolean;
    describedBy: string;
    items: ResolvedItem[];
    expectedHtml: string;
};

type ItemConfig = {
    name?: string;
    label?: string;
    id?: string;
    value?: string | number;
    error?: boolean;
    classes?: string;
};

type DateInputOptions = {
    id: string;
    namePrefix?: string;
    fieldset?: { legend?: { text?: string }; describedBy?: string };
    hint?: { text?: string };
    errorMessage?: { text?: string };
    values?: Record<string, string | number>;
    items?: ItemConfig[];
    day?: ItemConfig | false;
    month?: ItemConfig | false;
    year?: ItemConfig | false;
};

const DEFAULT_NAME: Record<number, string> = { 0: "day", 1: "month", 2: "year" };

function resolveItems(options: DateInputOptions, anyItemHasError: boolean, errorPresent: boolean): ResolvedItem[] {
    const namePrefix = options.namePrefix ? `${options.namePrefix}-` : "";
    const values = options.values ?? {};

    // Item list: explicit `items`, or the day/month/year shorthand (each may be
    // `false` to omit).
    let configs: (ItemConfig | false | undefined)[];
    if (options.items && options.items.length > 0) {
        configs = options.items;
    } else {
        configs = [options.day, options.month, options.year];
    }

    const resolved: ResolvedItem[] = [];
    configs.forEach((item, i) => {
        if (item === false) return; // omitted (e.g. year: false)
        const defaultName = DEFAULT_NAME[i] ?? "day";
        const cfg: ItemConfig = item && item !== undefined ? item : {};
        const itemName = cfg.name ?? defaultName;
        const isYear = itemName === "year" || i === 2;

        const itemHasError = cfg.error === true || Boolean(cfg.classes && cfg.classes.includes("govuk-input--error"));

        let inputClasses = "";
        // error class
        if (
            !(cfg.classes && cfg.classes.includes("govuk-input--error")) &&
            (itemHasError || (cfg.error !== false && errorPresent && !anyItemHasError))
        ) {
            inputClasses = "govuk-input--error";
        }
        // width class (only if not already supplied via item.classes)
        if (!(cfg.classes && cfg.classes.includes("govuk-input--width-"))) {
            const width = isYear ? 4 : 2;
            inputClasses = `${inputClasses} govuk-input--width-${width}`.trim();
        }
        if (cfg.classes) {
            inputClasses = `${inputClasses} ${cfg.classes}`.trim();
        }

        const name = `${namePrefix}${itemName}`;
        const value = cfg.value ?? values[name] ?? values[itemName];

        resolved.push({
            id: cfg.id ?? `${options.id}-${itemName}`,
            name,
            label: cfg.label ?? itemName.charAt(0).toUpperCase() + itemName.slice(1),
            value: value === undefined ? undefined : String(value),
            inputClasses,
        });
    });
    return resolved;
}

/** Every non-hidden date-input fixture, as structured data. */
export function dateInputFixtures(): DateInputData[] {
    return loadFixtures("date-input").map((fixture) => {
        const options = fixture.options as DateInputOptions;

        // Determine error state (mirrors the macro's anyItemHasError pass).
        const rawItems =
            options.items && options.items.length > 0
                ? options.items
                : ([options.day, options.month, options.year].filter(
                      (x) => x !== false && x !== undefined,
                  ) as ItemConfig[]);
        const anyItemHasError = rawItems.some(
            (it) => it.error === true || Boolean(it.classes && it.classes.includes("govuk-input--error")),
        );
        const errorPresent = Boolean(options.errorMessage);

        const parts: string[] = [];
        if (options.fieldset?.describedBy) parts.push(options.fieldset.describedBy);

        let hintId: string | undefined;
        if (options.hint) {
            hintId = `${options.id}-hint`;
            parts.push(hintId);
        }
        let errorId: string | undefined;
        if (options.errorMessage) {
            errorId = `${options.id}-error`;
            parts.push(errorId);
        }

        return {
            name: fixture.name,
            id: options.id,
            legend: options.fieldset?.legend?.text,
            hintId,
            hintText: options.hint?.text,
            errorId,
            errorText: options.errorMessage?.text,
            hasError: errorPresent,
            describedBy: parts.join(" "),
            items: resolveItems(options, anyItemHasError, errorPresent),
            expectedHtml: fixture.html,
        };
    });
}
