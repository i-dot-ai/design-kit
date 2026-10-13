/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type LabelProps = JSX.IntrinsicElements['label'] & {
    size?: "small" | "medium" | "large" | "xl";
    isPageHeading?: boolean;
    class?: string;
    children?: JSX.Element;
};

export default function Label(props: LabelProps) {
    const [local, rest] = splitProps(props, ["size", "isPageHeading", "class", "children"]);
    const classes = () =>
        [
            "govuk-label",
            (local.size ? { "small": "govuk-label--s", "medium": "govuk-label--m", "large": "govuk-label--l", "xl": "govuk-label--xl" }[local.size] : ""),
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    const label = (
        <label class={classes()} {...rest}>
            {local.children ?? ""}
        </label>
    );

    return local.isPageHeading ? (
        <h1 class="govuk-label-wrapper">{label}</h1>
    ) : (
        label
    );
}
