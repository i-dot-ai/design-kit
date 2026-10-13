/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type CheckboxLabelProps = JSX.IntrinsicElements['label'] & {
    class?: string;
    children?: JSX.Element;
};

export default function CheckboxLabel(props: CheckboxLabelProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-label govuk-checkboxes__label", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <label class={classes()} {...rest}>
            {local.children ?? ""}
        </label>
    );
}
