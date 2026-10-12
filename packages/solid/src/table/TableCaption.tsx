/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type TableCaptionProps = JSX.IntrinsicElements['caption'] & {
    size?: "small" | "medium" | "large" | "xl";
    class?: string;
    children?: JSX.Element;
};

export default function TableCaption(props: TableCaptionProps) {
    const [local, rest] = splitProps(props, ["size", "class", "children"]);
    const classes = () =>
        [
            "govuk-table__caption",
            (local.size ? { "small": "govuk-table__caption--s", "medium": "govuk-table__caption--m", "large": "govuk-table__caption--l", "xl": "govuk-table__caption--xl" }[local.size] : ""),
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <caption class={classes()} {...rest}>
            {local.children ?? ""}
        </caption>
    );
}
