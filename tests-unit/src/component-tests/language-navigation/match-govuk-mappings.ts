import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type LanguageItem = {
    text: string;
    lang?: string;
    dir?: string;
    href?: string;
    current: boolean;
    hreflang?: string;
    languageDescriptionText?: string;
};

export type LanguageNavigationData = {
    name: string;
    ariaLabel?: string;
    classes?: string;
    attributes?: Record<string, string>;
    items: LanguageItem[];
    expectedHtml: string;
};

type RawItem = {
    text?: string;
    lang?: string;
    dir?: string;
    href?: string;
    current?: boolean;
    hreflang?: string;
    languageDescriptionText?: string;
};

type LanguageNavigationOptions = {
    ariaLabel?: string;
    classes?: string;
    attributes?: Record<string, string>;
    items?: RawItem[];
};

/** Every non-hidden language-navigation fixture, as structured data. */
export function languageNavigationFixtures(): LanguageNavigationData[] {
    return loadFixtures("language-navigation").map((fixture) => {
        const options = fixture.options as LanguageNavigationOptions;
        return {
            name: fixture.name,
            ariaLabel: options.ariaLabel,
            classes: options.classes,
            attributes: options.attributes,
            items: (options.items ?? []).map((item) => ({
                text: item.text ?? "",
                lang: item.lang,
                dir: item.dir,
                href: item.href,
                current: item.current === true,
                hreflang: item.hreflang,
                languageDescriptionText: item.languageDescriptionText,
            })),
            expectedHtml: fixture.html,
        };
    });
}
