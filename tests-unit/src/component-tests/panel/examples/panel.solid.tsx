/** @jsxImportSource solid-js */

import type { JSX } from "solid-js";
import { For, Show } from "solid-js";
import { Panel, PanelTitle, PanelBody, PanelActions } from "@i-dot-ai-npm/component-library-solid";
import type { PanelData, PanelAction } from "../match-govuk-mappings.js";

// Raw-HTML fixture bodies re-authored as elements (see accordion pattern).
const bodyContent: Record<string, JSX.Element> = {
    default: (
        <>
            Your reference number<br /><strong>HDJ2123F</strong>
        </>
    ),
    interruption: <p class="govuk-body">You entered your age as <strong>109</strong>.</p>,
    "interruption-with-content-with-long-line-length": (
        <>
            <p class="govuk-body">You've changed the person's address from Wales to England. This means that the referral needs to be cancelled.</p>
            <p class="govuk-body">Previous home address: 1 Willow Lane, Newchurch, Kington, HR5 3QF</p>
            <p class="govuk-body">New home address: 9 Elm Street, Whitney-on-Wye, Hereford, HR3 6EH</p>
            <p class="govuk-body">You can go back to undo this change.</p>
        </>
    ),
    "interruption-with-headings-content-and-lists": (
        <>
            <h2 class="govuk-heading-m">Question: Where is Andy Cooke located?</h2>
            <p class="govuk-body">
                Previous answer: Custody<br />{" "}
                New answer: Released
            </p>
            <p class="govuk-body govuk-!-margin-bottom-2">You need to:</p>
            <ul class="govuk-list govuk-list--bullet">
                <li>enter their custody information</li>
                <li>update the licence conditions section</li>
            </ul>
        </>
    ),
};

function ActionLink(props: { action: PanelAction }) {
    const a = props.action;
    return (
        <Show
            when={a.href && a.type !== "button"}
            fallback={
                <button
                    type={a.type ?? "button"}
                    class="govuk-button govuk-button--inverse"
                    data-module="govuk-button"
                    {...(a.attributes ?? {})}
                >
                    {a.text}
                </button>
            }
        >
            <a class="govuk-link govuk-link--inverse" href={a.href}>
                {a.text}
            </a>
        </Show>
    );
}

export function renderPanel(data: PanelData): JSX.Element {
    return (
        <Panel class={data.classes}>
            <PanelTitle>{data.titleHtml ?? data.titleText}</PanelTitle>
            <Show when={data.html || data.text}>
                <PanelBody>{data.html ? bodyContent[data.name] : data.text}</PanelBody>
            </Show>
            <Show when={data.hasActions}>
                <PanelActions>
                    <Show when={data.actions.length > 0}>
                        <div class="govuk-button-group">
                            <For each={data.actions}>{(action) => <ActionLink action={action} />}</For>
                        </div>
                    </Show>
                </PanelActions>
            </Show>
        </Panel>
    );
}
