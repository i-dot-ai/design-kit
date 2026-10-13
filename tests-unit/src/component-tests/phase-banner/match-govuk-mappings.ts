import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type PhaseBannerData = {
    name: string;
    tagText?: string;
    tagHtml?: string;
    tagClasses?: string;
    bodyText?: string;
    bodyHtml?: string;
    expectedHtml: string;
};

type PhaseBannerOptions = {
    tag?: { text?: string; html?: string; classes?: string };
    text?: string;
    html?: string;
};

/** Every non-hidden phase-banner fixture, as structured data. */
export function phaseBannerFixtures(): PhaseBannerData[] {
    return loadFixtures("phase-banner").map((fixture) => {
        const options = fixture.options as PhaseBannerOptions;
        return {
            name: fixture.name,
            tagText: options.tag?.text,
            tagHtml: options.tag?.html,
            tagClasses: options.tag?.classes,
            bodyText: options.text,
            bodyHtml: options.html,
            expectedHtml: fixture.html,
        };
    });
}
