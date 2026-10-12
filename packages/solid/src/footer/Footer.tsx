/** @jsxImportSource solid-js */

import { For, Show } from "solid-js";
import type { JSX } from "solid-js";

type FooterLink = { href?: string; text?: string; attributes?: Record<string, string> };

type FooterProps = JSX.IntrinsicElements['div'] & {
    /** Support links shown in the inline list (e.g. Accessibility statement, Cookies, Privacy). */
    links?: FooterLink[];
    /** Visually-hidden heading above the support links. */
    visuallyHiddenTitle?: string;
    containerClasses?: string;
    class?: string;
    children?: JSX.Element;
};

export default function Footer(props: FooterProps) {
    const classes = () =>
        ["govuk-footer", "iai-footer", props.class ?? ""].filter(Boolean).join(" ");
    const containerClass = () =>
        ["govuk-width-container", props.containerClasses ?? ""].filter(Boolean).join(" ");

    return (
        <div class={classes()}>
            <div class={containerClass()}>
                <div class="govuk-footer__meta">
                    <div class="govuk-footer__meta-item govuk-footer__meta-item--grow">
                        <h2 class="govuk-visually-hidden">
                            {props.visuallyHiddenTitle ?? "Support links"}
                        </h2>
                        <Show when={props.links && props.links.length > 0}>
                            <ul class="govuk-footer__inline-list">
                                <For each={props.links}>
                                    {(link) => (
                                        <li class="govuk-footer__inline-list-item">
                                            <a
                                                class="govuk-footer__link"
                                                href={link.href}
                                                {...(link.attributes ?? {})}
                                            >
                                                {link.text}
                                            </a>
                                        </li>
                                    )}
                                </For>
                            </ul>
                        </Show>
                        <div class="govuk-footer__meta-custom">
                            Built by the{" "}
                            <a class="govuk-footer__link" href="https://ai.gov.uk/">
                                Incubator for Artificial Intelligence
                            </a>
                        </div>
                    </div>
                    <div class="govuk-footer__meta-item">{props.children}</div>
                </div>
            </div>
        </div>
    );
}
