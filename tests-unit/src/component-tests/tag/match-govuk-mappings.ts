import type { ComponentMapping } from "../match-govuk-mappings.js";

export const tagMapping: ComponentMapping = {
    classesToProps(classes) {
        const modifier = classes
            .split(/\s+/)
            .find((className) => className.startsWith("govuk-tag--"));
        if (!modifier) return {};
        return { colour: modifier.replace("govuk-tag--", "") };
    },
};
