/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type SideNavItemProps = JSX.IntrinsicElements['li'] & {
    href?: string;
    class?: string;
    children?: JSX.Element;
};

export default function SideNavItem(props: SideNavItemProps) {
    const [local, rest] = splitProps(props, ["href", "class", "children"]);
    const classes = () =>
        ["side-nav__item", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <li class={classes()} {...rest}>
            <a class="govuk-link govuk-link--no-visited-state govuk-!-font-size-16 govuk-link--no-underline" href={local.href}>
                {local.children ?? ""}
            </a>
        </li>
    );
}
