/** @jsxImportSource solid-js */

import { splitProps, Show } from "solid-js";
import type { JSX } from "solid-js";

type ServiceNavigationItemProps = JSX.IntrinsicElements['a'] & JSX.IntrinsicElements['span'] & {
    href?: string;
    current?: boolean;
    active?: boolean;
    class?: string;
    children?: JSX.Element;
};

export default function ServiceNavigationItem(props: ServiceNavigationItemProps) {
    const [local, rest] = splitProps(props, ["href", "current", "active", "class", "children"]);
    const isActive = () => local.current || local.active;
    const classes = () =>
        [
            "govuk-service-navigation__item",
            isActive() ? "govuk-service-navigation__item--active" : "",
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");
    const ariaCurrent = () => (local.current ? "page" : local.active ? "true" : undefined);
    const inner = () => (
        <Show when={isActive()} fallback={local.children ?? ""}>
            <strong class="govuk-service-navigation__active-fallback">{local.children ?? ""}</strong>
        </Show>
    );

    return (
        <li class={classes()}>
            <Show
                when={local.href !== undefined}
                fallback={
                    <span class="govuk-service-navigation__text" aria-current={ariaCurrent()} {...rest}>
                        {inner()}
                    </span>
                }
            >
                <a class="govuk-service-navigation__link" href={local.href} aria-current={ariaCurrent()} {...rest}>
                    {inner()}
                </a>
            </Show>
        </li>
    );
}
