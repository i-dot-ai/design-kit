/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type PaginationProps = JSX.IntrinsicElements['nav'] & {
    block?: boolean;
    class?: string;
    children?: JSX.Element;
};

export default function Pagination(props: PaginationProps) {
    const [local, rest] = splitProps(props, ["block", "class", "children"]);
    const classes = () =>
        [
            "govuk-pagination",
            local.block ? "govuk-pagination--block" : "",
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <nav class={classes()} aria-label="Pagination" {...rest}>
            {local.children ?? ""}
        </nav>
    );
}
