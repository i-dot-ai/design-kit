/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type TableProps = JSX.IntrinsicElements['table'] & {
    smallTextUntilTablet?: boolean;
    subtle?: boolean;
    summary?: boolean;
    class?: string;
    children?: JSX.Element;
};

export default function Table(props: TableProps) {
    const [local, rest] = splitProps(props, ["smallTextUntilTablet", "subtle", "summary", "class", "children"]);
    const classes = () =>
        [
            "govuk-table",
            local.smallTextUntilTablet ? "govuk-table--small-text-until-tablet" : "",
            local.subtle ? "govuk-table--subtle" : "",
            local.summary ? "govuk-table--summary" : "",
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <table class={classes()} {...rest}>
            {local.children ?? ""}
        </table>
    );
}
