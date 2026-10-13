/** @jsxImportSource solid-js */

import { splitProps, Show } from "solid-js";
import type { JSX } from "solid-js";

type BreadcrumbItemProps = JSX.IntrinsicElements['li'] & {
    href?: string;
    class?: string;
    children?: JSX.Element;
};

export default function BreadcrumbItem(props: BreadcrumbItemProps) {
    const [local, rest] = splitProps(props, ["href", "class", "children"]);
    const classes = () =>
        ["govuk-breadcrumbs__list-item", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <Show
            when={local.href !== undefined}
            fallback={
                <li class={classes()} aria-current="page" {...rest}>
                    {local.children ?? ""}
                </li>
            }
        >
            <li class={classes()} {...rest}>
                <a class="govuk-breadcrumbs__link" href={local.href}>
                    {local.children ?? ""}
                </a>
            </li>
        </Show>
    );
}
