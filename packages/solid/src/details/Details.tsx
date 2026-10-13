/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type DetailsProps = JSX.IntrinsicElements['details'] & {
    class?: string;
    children?: JSX.Element;
};

export default function Details(props: DetailsProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-details", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <details class={classes()} {...rest}>
            {local.children ?? ""}
        </details>
    );
}
