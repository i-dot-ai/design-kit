/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type SideNavProps = JSX.IntrinsicElements['nav'] & {
    class?: string;
    children?: JSX.Element;
};

export default function SideNav(props: SideNavProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["side-nav", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <nav class={classes()} {...rest}>
            {local.children ?? ""}
        </nav>
    );
}
