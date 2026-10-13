/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type RadioConditionalProps = JSX.IntrinsicElements['div'] & {
    hidden?: boolean;
    class?: string;
    children?: JSX.Element;
};

export default function RadioConditional(props: RadioConditionalProps) {
    const merged = { hidden: true, ...props };
    const [local, rest] = splitProps(merged, ["hidden", "class", "children"]);
    const classes = () =>
        [
            "govuk-radios__conditional",
            local.hidden ? "govuk-radios__conditional--hidden" : "",
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <div class={classes()} {...rest}>
            {local.children ?? ""}
        </div>
    );
}
