/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type SelectOptionProps = JSX.IntrinsicElements['option'] & {
    class?: string;
    children?: JSX.Element;
};

export default function SelectOption(props: SelectOptionProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <option class={classes()} {...rest}>
            {local.children ?? ""}
        </option>
    );
}
