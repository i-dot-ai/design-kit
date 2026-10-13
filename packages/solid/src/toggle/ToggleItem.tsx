/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ToggleItemProps = JSX.IntrinsicElements['div'] & {
    class?: string;
    children?: JSX.Element;
};

export default function ToggleItem(props: ToggleItemProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["iai-toggle__item", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <div class={classes()} {...rest}>
            {local.children ?? ""}
        </div>
    );
}
