/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type LanguageNavigationProps = JSX.IntrinsicElements['nav'] & {
    ariaLabel?: string;
    class?: string;
    children?: JSX.Element;
};

export default function LanguageNavigation(props: LanguageNavigationProps) {
    const [local, rest] = splitProps(props, ["ariaLabel", "class", "children"]);
    const classes = () =>
        ["govuk-language-navigation", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <nav class={classes()} aria-label={local.ariaLabel ?? "Language"} {...rest}>
            <ul class="govuk-language-navigation__list">
                {local.children}
            </ul>
        </nav>
    );
}
