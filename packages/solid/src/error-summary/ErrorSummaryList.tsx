/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ErrorSummaryListProps = JSX.IntrinsicElements['ul'] & {
    class?: string;
    children?: JSX.Element;
};

export default function ErrorSummaryList(props: ErrorSummaryListProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-list govuk-error-summary__list", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <ul class={classes()} {...rest}>
            {local.children ?? ""}
        </ul>
    );
}
