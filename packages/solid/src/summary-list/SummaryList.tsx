/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type SummaryListProps = JSX.IntrinsicElements['dl'] & {
    noBorder?: boolean;
    class?: string;
    children?: JSX.Element;
};

export default function SummaryList(props: SummaryListProps) {
    const [local, rest] = splitProps(props, ["noBorder", "class", "children"]);
    const classes = () =>
        [
            "govuk-summary-list",
            local.noBorder ? "govuk-summary-list--no-border" : "",
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <dl class={classes()} {...rest}>
            {local.children ?? ""}
        </dl>
    );
}
