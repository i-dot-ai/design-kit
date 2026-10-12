import type { ComponentMapping } from "../../matches-govuk-helpers/mapping.js";

export const skipLinkMapping: ComponentMapping = {
    transform(options, props) {
        if (typeof options.classes === "string" && options.classes) {
            props.class = options.classes;
        }
    },
};
