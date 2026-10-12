/** @jsxImportSource solid-js */
import { Show, For } from "solid-js";
import type { JSX } from "solid-js";
import {
    SummaryList,
    SummaryListRow,
    SummaryListKey,
    SummaryListValue,
    SummaryListActions,
    SummaryCard,
    SummaryCardTitleWrapper,
    SummaryCardTitle,
    SummaryCardActions,
    SummaryCardAction,
    SummaryCardContent,
} from "@i-dot-ai-npm/component-library-solid";
import type { ActionData, SummaryListData } from "../match-govuk-mappings.js";
import { hiddenSuffix } from "../match-govuk-mappings.js";
import { valueContent } from "../content/govuk-matched-content.solid.jsx";

const cardTitleHtml: Record<string, JSX.Element> = {
    "as a summary card with a html header": <em>Undergraduate teaching assistant</em>,
};

function ActionLink(props: { action: ActionData; cardTitle?: string }): JSX.Element {
    const suffix = () => hiddenSuffix(props.action.visuallyHiddenText, props.cardTitle);
    return (
        <a class="govuk-link" href={props.action.href}>
            {props.action.text}
            <Show when={suffix()}>
                <span class="govuk-visually-hidden">{suffix()}</span>
            </Show>
        </a>
    );
}

function RowActions(props: { actions: ActionData[]; cardTitle?: string }): JSX.Element {
    return (
        <Show
            when={props.actions.length > 1}
            fallback={<SummaryListActions><ActionLink action={props.actions[0]} cardTitle={props.cardTitle} /></SummaryListActions>}
        >
            <SummaryListActions>
                <ul class="govuk-summary-list__actions-list">
                    <For each={props.actions}>
                        {(action) => (
                            <li class="govuk-summary-list__actions-list-item">
                                <ActionLink action={action} cardTitle={props.cardTitle} />
                            </li>
                        )}
                    </For>
                </ul>
            </SummaryListActions>
        </Show>
    );
}

function List(props: { data: SummaryListData; cardTitle?: string }): JSX.Element {
    return (
        <SummaryList noBorder={props.data.noBorder}>
            <For each={props.data.rows}>
                {(row, i) => (
                    <SummaryListRow class={row.rowClass}>
                        <SummaryListKey>{row.keyText}</SummaryListKey>
                        <SummaryListValue>
                            {row.valueHtml ? valueContent[props.data.name][i()] : row.valueText}
                        </SummaryListValue>
                        <Show when={row.actions.length > 0}>
                            <RowActions actions={row.actions} cardTitle={props.cardTitle} />
                        </Show>
                    </SummaryListRow>
                )}
            </For>
        </SummaryList>
    );
}

export function renderSummaryList(data: SummaryListData): JSX.Element {
    if (!data.card) return <List data={data} />;

    const cardTitle = data.card.titleText;
    const titleNode = data.card.titleHtml ? cardTitleHtml[data.name] : data.card.titleText;
    const cardActions = data.card.actions;

    return (
        <SummaryCard>
            <SummaryCardTitleWrapper>
                <SummaryCardTitle>{titleNode}</SummaryCardTitle>
                <Show when={cardActions.length === 1}>
                    <SummaryCardActions single>
                        <ActionLink action={cardActions[0]} cardTitle={cardTitle} />
                    </SummaryCardActions>
                </Show>
                <Show when={cardActions.length > 1}>
                    <SummaryCardActions>
                        <For each={cardActions}>
                            {(action) => (
                                <SummaryCardAction>
                                    <ActionLink action={action} cardTitle={cardTitle} />
                                </SummaryCardAction>
                            )}
                        </For>
                    </SummaryCardActions>
                </Show>
            </SummaryCardTitleWrapper>
            <SummaryCardContent>
                <List data={data} cardTitle={cardTitle} />
            </SummaryCardContent>
        </SummaryCard>
    );
}
