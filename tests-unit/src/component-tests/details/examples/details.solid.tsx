/** @jsxImportSource solid-js */
import type { JSX } from "solid-js";
import { Details, DetailsSummary, DetailsText } from "@i-dot-ai-npm/component-library-solid";
import type { DetailsData } from "../match-govuk-mappings.js";

const htmlContent: Record<string, JSX.Element> = {
    "with html": (
        <>
            Your National Insurance number can be found on
            <ul>
                <li>your National Insurance card</li>
                <li>your payslip</li>
                <li>P60</li>
                <li>benefits information</li>
                <li>tax return</li>
            </ul>
        </>
    ),
};

export function renderDetails(data: DetailsData): JSX.Element {
    const detailsProps: Record<string, unknown> = {};
    if (data.id) detailsProps.id = data.id;
    if (data.open) detailsProps.open = true;

    return (
        <Details {...detailsProps}>
            <DetailsSummary>{data.summaryText}</DetailsSummary>
            <DetailsText>{data.html ? htmlContent[data.name] : data.text}</DetailsText>
        </Details>
    );
}
