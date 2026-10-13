/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type SkipLinkProps = JSX.IntrinsicElements['a'] & {
    class?: string;
    children?: JSX.Element;
};

export default function SkipLink(props: SkipLinkProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-skip-link", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <a class={classes()} data-module="govuk-skip-link" {...rest}>
            {local.children ?? ""}
        </a>
    );
}
