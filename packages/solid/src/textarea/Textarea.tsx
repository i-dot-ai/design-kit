/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type TextareaProps = JSX.IntrinsicElements['textarea'] & {
    error?: boolean;
    subtle?: boolean;
    value?: string;
    class?: string;
};

export default function Textarea(props: TextareaProps) {
    const [local, rest] = splitProps(props, ["error", "subtle", "value", "class"]);
    const classes = () =>
        [
            "govuk-textarea",
            local.error ? "govuk-textarea--error" : "",
            local.subtle ? "govuk-textarea--subtle" : "",
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <textarea class={classes()} {...rest}>{local.value ?? ""}</textarea>
    );
}
