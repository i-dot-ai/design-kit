import type { ComponentMapping } from "../match-govuk-mappings.js";

export const errorMessageMapping: ComponentMapping = {
    transform(options, props) {
        if (typeof options.visuallyHiddenText === "string") {
            props.visuallyHiddenText = options.visuallyHiddenText;
        }
    },
};
