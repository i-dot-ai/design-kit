/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ContentsPanelListHeadingProps = JSX.IntrinsicElements['h3'] & {
    class?: string;
    children?: JSX.Element;
};

export default function ContentsPanelListHeading(props: ContentsPanelListHeadingProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["contents-panel__list-heading", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <h3 class={classes()} {...rest}>
            {local.children}
        </h3>
    );
}
