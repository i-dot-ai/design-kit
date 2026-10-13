/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type RadiosProps = JSX.IntrinsicElements['div'] & {
    inline?: boolean;
    small?: boolean;
    class?: string;
    children?: JSX.Element;
};

export default function Radios(props: RadiosProps) {
    const [local, rest] = splitProps(props, ["inline", "small", "class", "children"]);
    const classes = () =>
        [
            "govuk-radios",
            local.inline ? "govuk-radios--inline" : "",
            local.small ? "govuk-radios--small" : "",
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <div class={classes()} data-module="govuk-radios" {...rest}>
            {local.children ?? ""}
        </div>
    );
}
