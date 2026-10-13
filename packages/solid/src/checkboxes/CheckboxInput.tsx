/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type CheckboxInputProps = JSX.IntrinsicElements['input'] & {
    class?: string;
};

export default function CheckboxInput(props: CheckboxInputProps) {
    const [local, rest] = splitProps(props, ["class"]);
    const classes = () =>
        ["govuk-checkboxes__input", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <input class={classes()} type="checkbox" {...rest} />
    );
}
