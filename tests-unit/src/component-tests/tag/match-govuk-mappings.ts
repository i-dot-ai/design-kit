import type { ComponentMapping } from "../../matches-govuk-helpers/mapping.js";

export const tagMapping: ComponentMapping = {
    classesToProps(classes) {
        const modifier = classes
            .split(/\s+/)
            .find((className) => className.startsWith("govuk-tag--"));
        if (!modifier) return {};
        return { colour: modifier.replace("govuk-tag--", "") };
    },
};
