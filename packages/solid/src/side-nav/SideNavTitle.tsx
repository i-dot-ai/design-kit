/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type SideNavTitleProps = JSX.IntrinsicElements['h2'] & {
    class?: string;
    children?: JSX.Element;
};

export default function SideNavTitle(props: SideNavTitleProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["side-nav__title", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <h2 class={classes()} {...rest}>
            {local.children ?? ""}
        </h2>
    );
}
