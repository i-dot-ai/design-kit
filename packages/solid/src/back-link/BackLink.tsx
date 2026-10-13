/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type BackLinkProps = JSX.IntrinsicElements['a'] & {
    inverse?: boolean;
    class?: string;
    children?: JSX.Element;
};

export default function BackLink(props: BackLinkProps) {
    const [local, rest] = splitProps(props, ["inverse", "class", "children"]);
    const classes = () =>
        [
            "govuk-back-link",
            local.inverse ? "govuk-back-link--inverse" : "",
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <a class={classes()} {...rest}>
            {local.children ?? ""}
        </a>
    );
}
