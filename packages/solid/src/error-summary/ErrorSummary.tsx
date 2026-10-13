/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ErrorSummaryProps = JSX.IntrinsicElements['div'] & {
    class?: string;
    children?: JSX.Element;
};

export default function ErrorSummary(props: ErrorSummaryProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-error-summary", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <div class={classes()} data-module="govuk-error-summary" {...rest}>
            <div role="alert">
                {local.children ?? ""}
            </div>
        </div>
    );
}
