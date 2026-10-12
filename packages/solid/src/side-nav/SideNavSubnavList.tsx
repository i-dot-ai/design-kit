/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type SideNavSubnavListProps = JSX.IntrinsicElements['ul'] & {
    class?: string;
    children?: JSX.Element;
};

export default function SideNavSubnavList(props: SideNavSubnavListProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["side-nav__subnav-list", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <ul class={classes()} {...rest}>
            {local.children ?? ""}
        </ul>
    );
}
