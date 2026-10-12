/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type FieldsetProps = JSX.IntrinsicElements['fieldset'] & {
    class?: string;
    children?: JSX.Element;
};

export default function Fieldset(props: FieldsetProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-fieldset", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <fieldset class={classes()} {...rest}>
            {local.children ?? ""}
        </fieldset>
    );
}
