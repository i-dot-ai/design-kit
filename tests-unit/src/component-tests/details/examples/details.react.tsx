import type { ReactNode } from "react";
import { Details, DetailsSummary, DetailsText } from "@i-dot-ai-npm/component-library-react";
import type { DetailsData } from "../match-govuk-mappings.js";

// Raw-HTML fixture bodies re-authored as elements (see accordion pattern).
const htmlContent: Record<string, ReactNode> = {
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

export function renderDetails(data: DetailsData): ReactNode {
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
