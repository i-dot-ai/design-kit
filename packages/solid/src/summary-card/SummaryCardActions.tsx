/** @jsxImportSource solid-js */

import { splitProps, Show } from "solid-js";
import type { JSX } from "solid-js";

type SummaryCardActionsProps = JSX.IntrinsicElements['div'] & JSX.IntrinsicElements['ul'] & {
    /** Render as a single-action wrapper (`<div>`) instead of a list (`<ul>`).
     *  govuk uses a div for exactly one action and a ul for multiple. */
    single?: boolean;
    class?: string;
    children?: JSX.Element;
};

export default function SummaryCardActions(props: SummaryCardActionsProps) {
    const [local, rest] = splitProps(props, ["single", "class", "children"]);
    const classes = () =>
        ["govuk-summary-card__actions", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <Show
            when={local.single}
            fallback={<ul class={classes()} {...rest}>{local.children ?? ""}</ul>}
        >
            <div class={classes()} {...rest}>{local.children ?? ""}</div>
        </Show>
    );
}
