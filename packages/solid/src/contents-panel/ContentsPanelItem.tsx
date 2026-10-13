/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ContentsPanelItemProps = JSX.IntrinsicElements['li'] & {
    href?: string;
    current?: boolean;
    class?: string;
    children?: JSX.Element;
};

export default function ContentsPanelItem(props: ContentsPanelItemProps) {
    const [local, rest] = splitProps(props, ["href", "current", "class", "children"]);
    const itemClasses = () =>
        [
            "contents-panel__list-item",
            local.current ? "contents-panel__list-item--current" : "",
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <li class={itemClasses()} {...rest}>
            <a
                class="contents-panel__link govuk-link govuk-link--no-visited-state govuk-link--no-underline"
                href={local.href}
                aria-current={local.current ? "page" : undefined}
            >
                {local.children}
            </a>
        </li>
    );
}
