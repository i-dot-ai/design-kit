import type { ComponentMapping } from "../../matches-govuk-helpers/mapping.js";

export const backLinkMapping: ComponentMapping = {
    defaultText: "Back",
    classesToProps(classes) {
        return {
            inverse: classes.split(/\s+/).includes("govuk-back-link--inverse"),
        };
    },
    transform(options, props) {
        props.href = options.href ?? "#";
    },
};
