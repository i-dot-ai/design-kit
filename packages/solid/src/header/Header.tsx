/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type HeaderProps = JSX.IntrinsicElements['div'] & {
    href?: string;
    class?: string;
    containerClasses?: string;
    children?: JSX.Element;
};

export default function Header(props: HeaderProps) {
    const [local, rest] = splitProps(props, ["href", "class", "containerClasses", "children"]);
    const classes = () =>
        ["govuk-generic-header", local.class ?? ""].filter(Boolean).join(" ");
    const container = () =>
        ["govuk-generic-header__container", local.containerClasses || "govuk-width-container"].join(" ");

    return (
        <div class={classes()} {...rest}>
            <div class={container()}>
                <div class="govuk-generic-header__logo">
                    <a class="govuk-generic-header__homepage-link" href={local.href}>
                        {local.children ?? ""}
                    </a>
                </div>
            </div>
        </div>
    );
}
