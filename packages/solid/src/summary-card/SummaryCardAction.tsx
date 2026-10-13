/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type SummaryCardActionProps = JSX.IntrinsicElements['li'] & {
    class?: string;
    children?: JSX.Element;
};

export default function SummaryCardAction(props: SummaryCardActionProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-summary-card__action", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <li class={classes()} {...rest}>
            {local.children ?? ""}
        </li>
    );
}
