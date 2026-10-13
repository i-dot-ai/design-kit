/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ButtonGroupProps = JSX.IntrinsicElements['div'] & {
    class?: string;
    children?: JSX.Element;
};

export default function ButtonGroup(props: ButtonGroupProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-button-group", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <div class={classes()} {...rest}>
            {local.children ?? ""}
        </div>
    );
}
