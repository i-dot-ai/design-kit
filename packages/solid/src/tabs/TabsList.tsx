/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type TabsListProps = JSX.IntrinsicElements['ul'] & {
    class?: string;
    children?: JSX.Element;
};

export default function TabsList(props: TabsListProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-tabs__list", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <ul class={classes()} {...rest}>
            {local.children ?? ""}
        </ul>
    );
}
