/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type WarningTextProps = JSX.IntrinsicElements['div'] & {
    class?: string;
    children?: JSX.Element;
};

export default function WarningText(props: WarningTextProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-warning-text", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <div class={classes()} {...rest}>
            <span class="govuk-warning-text__icon" aria-hidden="true">
                !
            </span>
            <strong class="govuk-warning-text__text">
                <span class="govuk-visually-hidden">
                    Warning
                </span>
                {local.children ?? ""}
            </strong>
        </div>
    );
}
