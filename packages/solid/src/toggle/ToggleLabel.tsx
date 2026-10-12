/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ToggleLabelProps = JSX.IntrinsicElements['label'] & {
    class?: string;
    children?: JSX.Element;
};

export default function ToggleLabel(props: ToggleLabelProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-label iai-toggle__label", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <label class={classes()} {...rest}>
            {local.children ?? ""}
        </label>
    );
}
