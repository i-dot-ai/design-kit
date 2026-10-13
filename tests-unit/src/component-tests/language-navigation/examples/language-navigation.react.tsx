import type { ReactNode } from "react";
import {
    LanguageNavigation,
    LanguageNavigationItem,
} from "@i-dot-ai-npm/component-library-react";
import type { LanguageNavigationData } from "../match-govuk-mappings.js";

export function renderLanguageNavigation(data: LanguageNavigationData): ReactNode {
    return (
        <LanguageNavigation
            ariaLabel={data.ariaLabel}
            class={data.classes}
            {...(data.attributes ?? {})}
        >
            {data.items.map((item, i) => (
                <LanguageNavigationItem
                    key={i}
                    href={item.href}
                    current={item.current}
                    lang={item.lang}
                    dir={item.dir}
                    hreflang={item.hreflang}
                    languageDescriptionText={item.languageDescriptionText}
                >
                    {item.text}
                </LanguageNavigationItem>
            ))}
        </LanguageNavigation>
    );
}
