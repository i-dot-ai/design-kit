/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type TagProps = JSX.IntrinsicElements['strong'] & {
    colour?: "grey" | "green" | "teal" | "turquoise" | "blue" | "light-blue" | "purple" | "magenta" | "pink" | "red" | "orange" | "yellow";
    class?: string;
    children?: JSX.Element;
};

export default function Tag(props: TagProps) {
    const [local, rest] = splitProps(props, ["colour", "class", "children"]);
    const classes = () =>
        [
            "govuk-tag",
            (local.colour ? { "grey": "govuk-tag--grey", "green": "govuk-tag--green", "teal": "govuk-tag--teal", "turquoise": "govuk-tag--turquoise", "blue": "govuk-tag--blue", "light-blue": "govuk-tag--light-blue", "purple": "govuk-tag--purple", "magenta": "govuk-tag--magenta", "pink": "govuk-tag--pink", "red": "govuk-tag--red", "orange": "govuk-tag--orange", "yellow": "govuk-tag--yellow" }[local.colour] : ""),
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <strong class={classes()} {...rest}>
            {local.children ?? ""}
        </strong>
    );
}
