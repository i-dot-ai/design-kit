import type { ReactNode } from "react";

// Panel content for each tabs fixture, keyed by fixture name then item index.
// React can't inject a raw HTML string as unwrapped content, so the govuk
// fixture panel HTML is re-authored here as real elements (accordion pattern).

function CaseTable({ rows }: { rows: [string, string, string][] }): ReactNode {
    return (
        <table className="govuk-table">
            <thead className="govuk-table__head">
                <tr className="govuk-table__row">
                    <th className="govuk-table__header" scope="col">Case manager</th>
                    <th className="govuk-table__header" scope="col">Cases opened</th>
                    <th className="govuk-table__header" scope="col">Cases closed</th>
                </tr>
            </thead>
            <tbody className="govuk-table__body">
                {rows.map(([name, opened, closed], i) => (
                    <tr className="govuk-table__row" key={i}>
                        <td className="govuk-table__cell">{name}</td>
                        <td className="govuk-table__cell">{opened}</td>
                        <td className="govuk-table__cell">{closed}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export const panelContent: Record<string, ReactNode[]> = {
    default: [
        <>
            <h2 className="govuk-heading-l">Past day</h2>
            <CaseTable rows={[["David Francis", "3", "0"], ["Paul Farmer", "1", "0"], ["Rita Patel", "2", "0"]]} />
        </>,
        <>
            <h2 className="govuk-heading-l">Past week</h2>
            <CaseTable rows={[["David Francis", "24", "18"], ["Paul Farmer", "16", "20"], ["Rita Patel", "24", "27"]]} />
        </>,
        <>
            <h2 className="govuk-heading-l">Past month</h2>
            <CaseTable rows={[["David Francis", "98", "95"], ["Paul Farmer", "122", "131"], ["Rita Patel", "126", "142"]]} />
        </>,
        <p className="govuk-body">There is no data for this year yet, check back later</p>,
    ],
    "tabs-with-anchor-in-panel": [
        <>
            <h2 className="govuk-heading-l">Tab 1</h2>
            <p className="govuk-body">Testing that when you click the anchor it moves to the anchor point successfully</p>
            <p className="govuk-body"><a className="govuk-link" href="#anchor">Anchor</a></p>
            <p className="govuk-body"><a id="anchor" tabIndex={0}>Anchor Point</a></p>
        </>,
        <h2 className="govuk-heading-l">Tab 2</h2>,
    ],
};
