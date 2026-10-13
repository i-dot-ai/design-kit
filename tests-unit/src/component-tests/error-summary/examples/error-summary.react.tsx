import type { ReactNode } from "react";
import {
    ErrorSummary,
    ErrorSummaryTitle,
    ErrorSummaryBody,
    ErrorSummaryList,
    ErrorSummaryItem,
} from "@i-dot-ai-npm/component-library-react";
import type { ErrorSummaryData } from "../match-govuk-mappings.js";

export function renderErrorSummary(data: ErrorSummaryData): ReactNode {
    return (
        <ErrorSummary>
            <ErrorSummaryTitle>{data.titleText}</ErrorSummaryTitle>
            <ErrorSummaryBody>
                {data.descriptionText !== undefined && <p>{data.descriptionText}</p>}
                {data.errorList.length > 0 && (
                    <ErrorSummaryList>
                        {data.errorList.map((item, i) => (
                            <ErrorSummaryItem key={i} href={item.href}>
                                {item.text}
                            </ErrorSummaryItem>
                        ))}
                    </ErrorSummaryList>
                )}
            </ErrorSummaryBody>
        </ErrorSummary>
    );
}
