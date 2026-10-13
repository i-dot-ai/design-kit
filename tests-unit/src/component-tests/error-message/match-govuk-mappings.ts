import type { ComponentMapping } from "../../matches-govuk-helpers/mapping.js";

export const errorMessageMapping: ComponentMapping = {
    transform(options, props) {
        if (typeof options.visuallyHiddenText === "string") {
            props.visuallyHiddenText = options.visuallyHiddenText;
        }
    },
};
