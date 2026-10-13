/** @jsxImportSource solid-js */

import type { JSX } from "solid-js";
import { For } from "solid-js";
import {
    LanguageNavigation,
    LanguageNavigationItem,
} from "@i-dot-ai-npm/component-library-solid";
import type { LanguageNavigationData } from "../match-govuk-mappings.js";

export function renderLanguageNavigation(data: LanguageNavigationData): JSX.Element {
    return (
        <LanguageNavigation
            ariaLabel={data.ariaLabel}
            class={data.classes}
            {...(data.attributes ?? {})}
        >
            <For each={data.items}>
                {(item) => (
                    <LanguageNavigationItem
                        href={item.href}
                        current={item.current}
                        lang={item.lang}
                        dir={item.dir}
                        hreflang={item.hreflang}
                        languageDescriptionText={item.languageDescriptionText}
                    >
                        {item.text}
                    </LanguageNavigationItem>
                )}
            </For>
        </LanguageNavigation>
    );
}
