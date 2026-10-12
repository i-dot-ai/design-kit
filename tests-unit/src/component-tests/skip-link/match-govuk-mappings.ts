import type { ComponentMapping } from "../match-govuk-mappings.js";

export const skipLinkMapping: ComponentMapping = {
    transform(options, props) {
        if (typeof options.classes === "string" && options.classes) {
            props.class = options.classes;
        }
    },
};
