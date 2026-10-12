/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ListProps = JSX.IntrinsicElements['ol'] & JSX.IntrinsicElements['ul'] & {
    spaced?: boolean;
    numbered?: string;
    class?: string;
    children?: JSX.Element;
};

export default function List(props: ListProps) {
    const [local, rest] = splitProps(props, ["spaced", "numbered", "class", "children"]);

    return (
        local.numbered ? (
            <ol class={["govuk-list govuk-list--number", local.spaced ? "govuk-list--spaced" : "", local.class ?? ""].filter(Boolean).join(" ")} {...rest}>
                {local.children ?? ""}
            </ol>
        ) : (
            <ul class={["govuk-list", local.spaced ? "govuk-list--spaced" : "", local.class ?? ""].filter(Boolean).join(" ")} {...rest}>
                {local.children ?? ""}
            </ul>
        )
    );
}
