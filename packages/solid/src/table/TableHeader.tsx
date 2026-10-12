/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type TableHeaderProps = JSX.IntrinsicElements['th'] & {
    numeric?: boolean;
    scope?: "col" | "row" | "colgroup" | "rowgroup";
    class?: string;
    children?: JSX.Element;
};

export default function TableHeader(props: TableHeaderProps) {
    const [local, rest] = splitProps(props, ["numeric", "scope", "class", "children"]);
    const classes = () =>
        [
            "govuk-table__header",
            local.numeric ? "govuk-table__header--numeric" : "",
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <th class={classes()} scope={local.scope ?? "col"} {...rest}>
            {local.children ?? ""}
        </th>
    );
}
