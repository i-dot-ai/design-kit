/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type DateInputItemProps = JSX.IntrinsicElements['div'] & {
    class?: string;
    children?: JSX.Element;
};

export default function DateInputItem(props: DateInputItemProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-date-input__item", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <div class={classes()} {...rest}>
            {local.children ?? ""}
        </div>
    );
}
