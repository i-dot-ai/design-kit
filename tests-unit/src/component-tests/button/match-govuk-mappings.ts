import type { ComponentMapping } from "../../matches-govuk-helpers/mapping.js";

export const buttonMapping: ComponentMapping = {
    classesToProps(classes) {
        const set = new Set(classes.split(/\s+/).filter(Boolean));
        return {
            secondary: set.has("govuk-button--secondary"),
            warning: set.has("govuk-button--warning"),
            inverse: set.has("govuk-button--inverse"),
        };
    },
    transform(options, props) {
        if (options.isStartButton) props.startButton = true;
        if (options.disabled) {
            props.disabled = true;
            props["aria-disabled"] = "true";
        }
    },
};
