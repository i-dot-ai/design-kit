/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type TableCellProps = JSX.IntrinsicElements['td'] & {
    numeric?: boolean;
    stretch?: boolean;
    noWrap?: boolean;
    small?: boolean;
    class?: string;
    children?: JSX.Element;
};

export default function TableCell(props: TableCellProps) {
    const [local, rest] = splitProps(props, ["numeric", "stretch", "noWrap", "small", "class", "children"]);
    const classes = () =>
        [
            "govuk-table__cell",
            local.numeric ? "govuk-table__cell--numeric" : "",
            local.stretch ? "govuk-table__cell--stretch" : "",
            local.noWrap ? "govuk-table__cell--no-wrap" : "",
            local.small ? "govuk-table__cell--small" : "",
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <td class={classes()} {...rest}>
            {local.children ?? ""}
        </td>
    );
}
