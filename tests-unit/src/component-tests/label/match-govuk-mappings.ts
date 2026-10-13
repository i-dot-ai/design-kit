import type { ComponentMapping } from "../../matches-govuk-helpers/mapping.js";

// govuk options -> our <Label> props:
//   text / html      -> children (handled by mapOptions default textFrom).
//   for              -> for (passthrough).
//   classes          -> size (govuk-label--s/m/l/xl) or passed through as class.
//   isPageHeading    -> isPageHeading (wraps the label in <h1 class="govuk-label-wrapper">).
//   attributes       -> spread onto the label (handled by mapOptions).
const SIZE_FROM_CLASS: Record<string, "small" | "medium" | "large" | "xl"> = {
    "govuk-label--s": "small",
    "govuk-label--m": "medium",
    "govuk-label--l": "large",
    "govuk-label--xl": "xl",
};

export const labelMapping: ComponentMapping = {
    passthrough: ["for"],
    classesToProps(classes) {
        const sizeClass = classes
            .split(/\s+/)
            .find((c) => c in SIZE_FROM_CLASS);
        return sizeClass ? { size: SIZE_FROM_CLASS[sizeClass] } : {};
    },
    transform(options, props) {
        if (options.isPageHeading === true) props.isPageHeading = true;
    },
};
