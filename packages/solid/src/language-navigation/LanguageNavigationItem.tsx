/** @jsxImportSource solid-js */

import { splitProps, Show } from "solid-js";
import type { JSX } from "solid-js";

type LanguageNavigationItemProps = JSX.IntrinsicElements['span'] & JSX.IntrinsicElements['a'] & {
    href?: string;
    current?: boolean;
    lang?: string;
    dir?: "ltr" | "rtl" | "auto";
    hreflang?: string;
    languageDescriptionText?: string;
    children?: JSX.Element;
};

export default function LanguageNavigationItem(props: LanguageNavigationItemProps) {
    const [local, rest] = splitProps(props, [
        "href",
        "current",
        "lang",
        "dir",
        "hreflang",
        "languageDescriptionText",
        "children",
    ]);

    return (
        <li class="govuk-language-navigation__list-item">
            <Show
                when={local.current}
                fallback={
                    <a
                        class="govuk-language-navigation__link"
                        href={local.href}
                        rel="alternate"
                        lang={local.lang}
                        hreflang={local.hreflang ?? local.lang}
                        dir={local.dir}
                        {...rest}
                    >
                        {local.children}
                        <Show when={local.languageDescriptionText}>
                            <span class="govuk-visually-hidden"> {local.languageDescriptionText}</span>
                        </Show>
                    </a>
                }
            >
                <span
                    class="govuk-language-navigation__text"
                    aria-current="true"
                    lang={local.lang}
                    dir={local.dir}
                    {...rest}
                >
                    {local.children}
                </span>
            </Show>
        </li>
    );
}
