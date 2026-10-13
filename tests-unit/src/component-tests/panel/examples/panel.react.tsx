import type { ReactNode } from "react";
import { Panel, PanelTitle, PanelBody, PanelActions } from "@i-dot-ai-npm/component-library-react";
import type { PanelData, PanelAction } from "../match-govuk-mappings.js";

// Raw-HTML fixture bodies re-authored as elements (see accordion pattern).
const bodyContent: Record<string, ReactNode> = {
    default: (
        <>
            Your reference number<br /><strong>HDJ2123F</strong>
        </>
    ),
    interruption: <p className="govuk-body">You entered your age as <strong>109</strong>.</p>,
    "interruption-with-content-with-long-line-length": (
        <>
            <p className="govuk-body">You've changed the person's address from Wales to England. This means that the referral needs to be cancelled.</p>
            <p className="govuk-body">Previous home address: 1 Willow Lane, Newchurch, Kington, HR5 3QF</p>
            <p className="govuk-body">New home address: 9 Elm Street, Whitney-on-Wye, Hereford, HR3 6EH</p>
            <p className="govuk-body">You can go back to undo this change.</p>
        </>
    ),
    "interruption-with-headings-content-and-lists": (
        <>
            <h2 className="govuk-heading-m">Question: Where is Andy Cooke located?</h2>
            <p className="govuk-body">
                Previous answer: Custody<br />{" "}
                New answer: Released
            </p>
            <p className="govuk-body govuk-!-margin-bottom-2">You need to:</p>
            <ul className="govuk-list govuk-list--bullet">
                <li>enter their custody information</li>
                <li>update the licence conditions section</li>
            </ul>
        </>
    ),
};

function ActionLink({ action }: { action: PanelAction }) {
    // govuk renders a Button (inverse) unless there's an href and no button type.
    if (!action.href || action.type === "button") {
        return (
            <button
                type={action.type ?? "button"}
                className="govuk-button govuk-button--inverse"
                data-module="govuk-button"
                {...(action.attributes ?? {})}
            >
                {action.text}
            </button>
        );
    }
    return (
        <a className="govuk-link govuk-link--inverse" href={action.href}>
            {action.text}
        </a>
    );
}

export function renderPanel(data: PanelData): ReactNode {
    return (
        <Panel class={data.classes}>
            <PanelTitle>{data.titleHtml ?? data.titleText}</PanelTitle>
            {(data.html || data.text) && (
                <PanelBody>{data.html ? bodyContent[data.name] : data.text}</PanelBody>
            )}
            {data.hasActions && (
                <PanelActions>
                    {data.actions.length > 0 && (
                        <div className="govuk-button-group">
                            {data.actions.map((action, i) => (
                                <ActionLink key={i} action={action} />
                            ))}
                        </div>
                    )}
                </PanelActions>
            )}
        </Panel>
    );
}
