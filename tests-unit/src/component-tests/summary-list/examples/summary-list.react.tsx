import type { ReactNode } from "react";
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
} from "@i-dot-ai-npm/component-library-react";
import type { ActionData, SummaryListData } from "../match-govuk-mappings.js";
import { hiddenSuffix } from "../match-govuk-mappings.js";
import { valueContent } from "../content/govuk-matched-content.react.jsx";

// Re-authored HTML card titles, keyed by fixture name.
const cardTitleHtml: Record<string, ReactNode> = {
    "as a summary card with a html header": <em>Undergraduate teaching assistant</em>,
};

function ActionLink({ action, cardTitle }: { action: ActionData; cardTitle?: string }): ReactNode {
    const suffix = hiddenSuffix(action.visuallyHiddenText, cardTitle);
    return (
        <a className="govuk-link" href={action.href}>
            {action.text}
            {suffix && <span className="govuk-visually-hidden">{suffix}</span>}
        </a>
    );
}

function RowActions({ actions, cardTitle }: { actions: ActionData[]; cardTitle?: string }): ReactNode {
    if (actions.length === 1) {
        return <SummaryListActions><ActionLink action={actions[0]} cardTitle={cardTitle} /></SummaryListActions>;
    }
    return (
        <SummaryListActions>
            <ul className="govuk-summary-list__actions-list">
                {actions.map((action, i) => (
                    <li className="govuk-summary-list__actions-list-item" key={i}>
                        <ActionLink action={action} cardTitle={cardTitle} />
                    </li>
                ))}
            </ul>
        </SummaryListActions>
    );
}

function List({ data, cardTitle }: { data: SummaryListData; cardTitle?: string }): ReactNode {
    return (
        <SummaryList noBorder={data.noBorder}>
            {data.rows.map((row, i) => (
                <SummaryListRow key={i} class={row.rowClass}>
                    <SummaryListKey>{row.keyText}</SummaryListKey>
                    <SummaryListValue>
                        {row.valueHtml ? valueContent[data.name][i] : row.valueText}
                    </SummaryListValue>
                    {row.actions.length > 0 && <RowActions actions={row.actions} cardTitle={cardTitle} />}
                </SummaryListRow>
            ))}
        </SummaryList>
    );
}

export function renderSummaryList(data: SummaryListData): ReactNode {
    if (!data.card) return <List data={data} />;

    const cardTitle = data.card.titleText;
    const titleNode = data.card.titleHtml ? cardTitleHtml[data.name] : data.card.titleText;
    const cardActions = data.card.actions;

    return (
        <SummaryCard>
            <SummaryCardTitleWrapper>
                <SummaryCardTitle>{titleNode}</SummaryCardTitle>
                {cardActions.length === 1 && (
                    <SummaryCardActions single>
                        <ActionLink action={cardActions[0]} cardTitle={cardTitle} />
                    </SummaryCardActions>
                )}
                {cardActions.length > 1 && (
                    <SummaryCardActions>
                        {cardActions.map((action, i) => (
                            <SummaryCardAction key={i}>
                                <ActionLink action={action} cardTitle={cardTitle} />
                            </SummaryCardAction>
                        ))}
                    </SummaryCardActions>
                )}
            </SummaryCardTitleWrapper>
            <SummaryCardContent>
                <List data={data} cardTitle={cardTitle} />
            </SummaryCardContent>
        </SummaryCard>
    );
}
