/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ListItemProps = JSX.IntrinsicElements['li'] & {
    class?: string;
    children?: JSX.Element;
};

export default function ListItem(props: ListItemProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-list-item", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <li class={classes()} {...rest}>
            {local.children ?? ""}
        </li>
    );
}
