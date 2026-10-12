/** @jsxImportSource solid-js */
import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import {
    CookieBanner,
    CookieBannerMessage,
    CookieBannerHeading,
    CookieBannerContent,
    CookieBannerActions,
    Button,
} from "@i-dot-ai-npm/component-library-solid";
import type { CookieAction, CookieMessage, CookieBannerData } from "../match-govuk-mappings.js";

const headingHtmlContent: Record<string, JSX.Element> = {
    "Cookies on <span>my service</span>": <>Cookies on <span>my service</span></>,
};

const bodyHtmlContent: Record<string, JSX.Element> = {
    "with html": (
        <>
            <p class="govuk-body">We use cookies in <span>our service</span>.</p>
            <p class="govuk-body">We’d like to use analytics cookies so we can understand how you use the Design System and make improvements.</p>
        </>
    ),
};

function Action(props: { action: CookieAction }): JSX.Element {
    return (
        <Show
            when={props.action.href !== undefined}
            fallback={
                <Button type={props.action.type} name={props.action.name} value={props.action.value}>
                    {props.action.text}
                </Button>
            }
        >
            <a class="govuk-link" href={props.action.href}>{props.action.text}</a>
        </Show>
    );
}

function Message(props: { message: CookieMessage; name: string }): JSX.Element {
    return (
        <CookieBannerMessage {...(props.message.role ? { role: props.message.role } : {})}>
            <div class="govuk-grid-row">
                <div class="govuk-grid-column-two-thirds">
                    <Show when={props.message.headingHtml !== undefined}>
                        <CookieBannerHeading>{headingHtmlContent[props.message.headingHtml!]}</CookieBannerHeading>
                    </Show>
                    <Show when={props.message.headingHtml === undefined && props.message.headingText !== undefined}>
                        <CookieBannerHeading>{props.message.headingText}</CookieBannerHeading>
                    </Show>
                    <CookieBannerContent>
                        <Show
                            when={props.message.html !== undefined}
                            fallback={<p class="govuk-body">{props.message.text}</p>}
                        >
                            {bodyHtmlContent[props.name]}
                        </Show>
                    </CookieBannerContent>
                </div>
            </div>
            <Show when={props.message.actions.length > 0}>
                <CookieBannerActions>
                    <For each={props.message.actions}>{(action) => <Action action={action} />}</For>
                </CookieBannerActions>
            </Show>
        </CookieBannerMessage>
    );
}

export function renderCookieBanner(data: CookieBannerData): JSX.Element {
    return (
        <CookieBanner>
            <For each={data.messages}>{(message) => <Message message={message} name={data.name} />}</For>
        </CookieBanner>
    );
}
