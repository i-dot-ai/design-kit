/** @jsxImportSource solid-js */

import { splitProps, Show } from "solid-js";
import type { JSX } from "solid-js";

type ErrorSummaryItemProps = JSX.IntrinsicElements['a'] & {
    href?: string;
    class?: string;
    children?: JSX.Element;
};

export default function ErrorSummaryItem(props: ErrorSummaryItemProps) {
    const [local, rest] = splitProps(props, ["href", "class", "children"]);

    return (
        <li>
            <Show when={local.href !== undefined} fallback={local.children ?? ""}>
                <a href={local.href} class={local.class} {...rest}>
                    {local.children ?? ""}
                </a>
            </Show>
        </li>
    );
}
