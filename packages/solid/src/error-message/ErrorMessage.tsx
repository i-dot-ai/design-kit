/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ErrorMessageProps = JSX.IntrinsicElements['p'] & {
    visuallyHiddenText?: string;
    class?: string;
    children?: JSX.Element;
};

export default function ErrorMessage(props: ErrorMessageProps) {
    const [local, rest] = splitProps(props, ["visuallyHiddenText", "class", "children"]);
    const classes = () =>
        ["govuk-error-message", local.class ?? ""].filter(Boolean).join(" ");
    const hiddenText = () => local.visuallyHiddenText ?? "Error";

    return (
        <p class={classes()} {...rest}>
            {hiddenText() ? (
                <span class="govuk-visually-hidden">{hiddenText()}:</span>
            ) : null}{" "}
            {local.children ?? ""}
        </p>
    );
}
