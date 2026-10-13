/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type InputLabelProps = JSX.IntrinsicElements['label'] & {
    size?: "small" | "medium" | "large" | "xl";
    class?: string;
    children?: JSX.Element;
};

export default function InputLabel(props: InputLabelProps) {
    const [local, rest] = splitProps(props, ["size", "class", "children"]);
    const classes = () =>
        [
            "govuk-label",
            (local.size ? { "small": "govuk-label--s", "medium": "govuk-label--m", "large": "govuk-label--l", "xl": "govuk-label--xl" }[local.size] : ""),
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <label class={classes()} {...rest}>
            {local.children ?? ""}
        </label>
    );
}
