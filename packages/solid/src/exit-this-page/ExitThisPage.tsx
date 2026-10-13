/** @jsxImportSource solid-js */

import { splitProps, Show } from "solid-js";
import type { JSX } from "solid-js";

type ExitThisPageProps = JSX.IntrinsicElements['div'] & {
    redirectUrl?: string;
    id?: string;
    class?: string;
    children?: JSX.Element;
};

export default function ExitThisPage(props: ExitThisPageProps) {
    const [local, rest] = splitProps(props, ["redirectUrl", "id", "class", "children"]);
    const classes = () =>
        ["govuk-exit-this-page", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <div
            id={local.id}
            class={classes()}
            data-module="govuk-exit-this-page"
            {...rest}
        >
            <a
                href={local.redirectUrl ?? "https://www.bbc.co.uk/weather"}
                role="button"
                draggable="false"
                class="govuk-button govuk-button--warning govuk-exit-this-page__button govuk-js-exit-this-page-button"
                data-module="govuk-button"
                rel="nofollow noreferrer"
            >
                <Show
                    when={local.children}
                    fallback={
                        <>
                            <span class="govuk-visually-hidden">Emergency</span> Exit this page
                        </>
                    }
                >
                    {local.children}
                </Show>
            </a>
        </div>
    );
}
