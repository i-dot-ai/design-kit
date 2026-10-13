/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type TableBodyProps = JSX.IntrinsicElements['tbody'] & {
    class?: string;
    children?: JSX.Element;
};

export default function TableBody(props: TableBodyProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-table__body", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <tbody class={classes()} {...rest}>
            {local.children ?? ""}
        </tbody>
    );
}
