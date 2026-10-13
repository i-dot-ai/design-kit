/** @jsxImportSource solid-js */

import { splitProps, Show } from "solid-js";
import type { JSX } from "solid-js";

type PaginationItemProps = JSX.IntrinsicElements['a'] & {
    current?: boolean;
    ellipsis?: boolean;
    ariaLabel?: string;
    class?: string;
    children?: JSX.Element;
};

export default function PaginationItem(props: PaginationItemProps) {
    const [local, rest] = splitProps(props, ["current", "ellipsis", "ariaLabel", "class", "children"]);

    return (
        <Show
            when={!local.ellipsis}
            fallback={
                <li class="govuk-pagination__item govuk-pagination__item--ellipsis">
                    {local.children ?? "⋯"}
                </li>
            }
        >
            <li class={["govuk-pagination__item", local.current ? "govuk-pagination__item--current" : ""].filter(Boolean).join(" ")}>
                <a
                    class={["govuk-link govuk-pagination__link", local.class ?? ""].filter(Boolean).join(" ")}
                    aria-label={local.ariaLabel}
                    aria-current={local.current ? "page" : undefined}
                    {...rest}
                >
                    {local.children ?? ""}
                </a>
            </li>
        </Show>
    );
}
