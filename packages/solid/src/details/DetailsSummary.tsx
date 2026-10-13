/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type DetailsSummaryProps = JSX.IntrinsicElements['summary'] & {
    class?: string;
    children?: JSX.Element;
};

export default function DetailsSummary(props: DetailsSummaryProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-details__summary", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <summary class={classes()} {...rest}>
            <span class="govuk-details__summary-text">
                {local.children ?? ""}
            </span>
        </summary>
    );
}
