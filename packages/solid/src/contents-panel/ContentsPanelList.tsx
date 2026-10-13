/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ContentsPanelListProps = JSX.IntrinsicElements['ul'] & {
    class?: string;
    children?: JSX.Element;
};

export default function ContentsPanelList(props: ContentsPanelListProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["contents-panel__list", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <ul class={classes()} {...rest}>
            {local.children}
        </ul>
    );
}
