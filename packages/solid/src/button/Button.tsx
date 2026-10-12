/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ButtonProps = Omit<JSX.IntrinsicElements['a'] & JSX.IntrinsicElements['button'], 'type' | 'href'> & {
    secondary?: boolean;
    tertiary?: boolean;
    warning?: boolean;
    inverse?: boolean;
    small?: boolean;
    startButton?: boolean;
    href?: string;
    type?: "button" | "menu" | "submit" | "reset";
    class?: string;
    children?: JSX.Element;
};

const StartIcon = () => (
    <svg
        class="govuk-button__start-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="17.5"
        height="19"
        viewBox="0 0 33 40"
        aria-hidden="true"
        // @ts-ignore-next-line: needed to match govuk html exactly
        attr:focusable="false"
    >
        <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
    </svg>
);

export default function Button(props: ButtonProps) {
    const [local, rest] = splitProps(props, ["secondary", "tertiary", "warning", "inverse", "small", "startButton", "href", "type", "class", "children"]);

    const classes = () => ["govuk-button", local.secondary ? "govuk-button--secondary" : "", local.warning ? "govuk-button--warning" : "", local.inverse ? "govuk-button--inverse" : "", local.tertiary ? "govuk-button--tertiary" : "", local.small ? "govuk-button--small" : "", local.startButton ? "govuk-button--start" : "", local.class ?? ""].filter(Boolean).join(" ");

    return (
        local.href ? (
            <a href={local.href} role="button" draggable="false" class={classes()} data-module="govuk-button" {...rest}>
                {local.children ?? ""}
                {local.startButton ? <StartIcon /> : null}
            </a>
        ) : (
            <button type={local.type ?? "submit"} class={classes()} data-module="govuk-button" {...rest}>
                {local.children ?? ""}
                {local.startButton ? <StartIcon /> : null}
            </button>
        )
    );
}
