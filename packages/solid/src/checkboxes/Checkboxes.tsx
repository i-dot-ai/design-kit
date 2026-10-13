/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type CheckboxesProps = JSX.IntrinsicElements['div'] & {
    small?: boolean;
    subtle?: boolean;
    class?: string;
    children?: JSX.Element;
};

export default function Checkboxes(props: CheckboxesProps) {
    const [local, rest] = splitProps(props, ["small", "subtle", "class", "children"]);
    const classes = () =>
        [
            "govuk-checkboxes",
            local.small ? "govuk-checkboxes--small" : "",
            local.subtle ? "govuk-checkboxes--subtle" : "",
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <div class={classes()} data-module="govuk-checkboxes" {...rest}>
            {local.children ?? ""}
        </div>
    );
}
