/** @jsxImportSource solid-js */
import type { JSX } from "solid-js";

// Panel content for each tabs fixture (see the React version for rationale).

function CaseTable(props: { rows: [string, string, string][] }): JSX.Element {
    return (
        <table class="govuk-table">
            <thead class="govuk-table__head">
                <tr class="govuk-table__row">
                    <th class="govuk-table__header" scope="col">Case manager</th>
                    <th class="govuk-table__header" scope="col">Cases opened</th>
                    <th class="govuk-table__header" scope="col">Cases closed</th>
                </tr>
            </thead>
            <tbody class="govuk-table__body">
                {props.rows.map(([name, opened, closed]) => (
                    <tr class="govuk-table__row">
                        <td class="govuk-table__cell">{name}</td>
                        <td class="govuk-table__cell">{opened}</td>
                        <td class="govuk-table__cell">{closed}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export const panelContent: Record<string, JSX.Element[]> = {
    default: [
        <>
            <h2 class="govuk-heading-l">Past day</h2>
            <CaseTable rows={[["David Francis", "3", "0"], ["Paul Farmer", "1", "0"], ["Rita Patel", "2", "0"]]} />
        </>,
        <>
            <h2 class="govuk-heading-l">Past week</h2>
            <CaseTable rows={[["David Francis", "24", "18"], ["Paul Farmer", "16", "20"], ["Rita Patel", "24", "27"]]} />
        </>,
        <>
            <h2 class="govuk-heading-l">Past month</h2>
            <CaseTable rows={[["David Francis", "98", "95"], ["Paul Farmer", "122", "131"], ["Rita Patel", "126", "142"]]} />
        </>,
        <p class="govuk-body">There is no data for this year yet, check back later</p>,
    ],
    "tabs-with-anchor-in-panel": [
        <>
            <h2 class="govuk-heading-l">Tab 1</h2>
            <p class="govuk-body">Testing that when you click the anchor it moves to the anchor point successfully</p>
            <p class="govuk-body"><a class="govuk-link" href="#anchor">Anchor</a></p>
            <p class="govuk-body"><a id="anchor" tabindex={0}>Anchor Point</a></p>
        </>,
        <h2 class="govuk-heading-l">Tab 2</h2>,
    ],
};
