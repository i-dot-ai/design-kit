/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type SummaryListKeyProps = JSX.IntrinsicElements['dt'] & {
    class?: string;
    children?: JSX.Element;
};

export default function SummaryListKey(props: SummaryListKeyProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-summary-list__key", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <dt class={classes()} {...rest}>
            {local.children ?? ""}
        </dt>
    );
}
