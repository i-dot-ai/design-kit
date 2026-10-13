/** @jsxImportSource solid-js */

import { splitProps, Show } from "solid-js";
import type { JSX } from "solid-js";

type PaginationNextProps = JSX.IntrinsicElements['a'] & {
    block?: boolean;
    labelText?: string;
    class?: string;
    children?: JSX.Element;
};

const arrow = (
    <svg
        class="govuk-pagination__icon govuk-pagination__icon--next"
        xmlns="http://www.w3.org/2000/svg"
        height="13"
        width="15"
        aria-hidden="true"
        // @ts-ignore-next-line: needed to match govuk html exactly
        attr:focusable="false"
        viewBox="0 0 15 13"
    >
        <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
    </svg>
);

export default function PaginationNext(props: PaginationNextProps) {
    const [local, rest] = splitProps(props, ["block", "labelText", "class", "children"]);
    const classes = () => ["govuk-link govuk-pagination__link", local.class ?? ""].filter(Boolean).join(" ");
    const titleClasses = () =>
        [
            "govuk-pagination__link-title",
            local.block && !local.labelText ? "govuk-pagination__link-title--decorated" : "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <div class="govuk-pagination__next">
            <a class={classes()} rel="next" {...rest}>
                <Show when={local.block}>{arrow}</Show>
                <span class={titleClasses()}>
                    <Show when={local.children} fallback={<>Next<span class="govuk-visually-hidden"> page</span></>}>
                        {local.children}
                    </Show>
                </span>
                <Show when={local.labelText && local.block}>
                    <span class="govuk-visually-hidden">:</span>
                    <span class="govuk-pagination__link-label">{local.labelText}</span>
                </Show>
                <Show when={!local.block}>{arrow}</Show>
            </a>
        </div>
    );
}
