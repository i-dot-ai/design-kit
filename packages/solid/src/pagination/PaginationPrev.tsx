/** @jsxImportSource solid-js */

import { splitProps, Show } from "solid-js";
import type { JSX } from "solid-js";

type PaginationPrevProps = JSX.IntrinsicElements['a'] & {
    block?: boolean;
    labelText?: string;
    class?: string;
    children?: JSX.Element;
};

const arrow = (
    <svg
        class="govuk-pagination__icon govuk-pagination__icon--prev"
        xmlns="http://www.w3.org/2000/svg"
        height="13"
        width="15"
        aria-hidden="true"
        // @ts-ignore-next-line: needed to match govuk html exactly
        attr:focusable="false"
        viewBox="0 0 15 13"
    >
        <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
    </svg>
);

export default function PaginationPrev(props: PaginationPrevProps) {
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
        <div class="govuk-pagination__prev">
            <a class={classes()} rel="prev" {...rest}>
                {arrow}
                <span class={titleClasses()}>
                    <Show when={local.children} fallback={<>Previous<span class="govuk-visually-hidden"> page</span></>}>
                        {local.children}
                    </Show>
                </span>
                <Show when={local.labelText && local.block}>
                    <span class="govuk-visually-hidden">:</span>
                    <span class="govuk-pagination__link-label">{local.labelText}</span>
                </Show>
            </a>
        </div>
    );
}
