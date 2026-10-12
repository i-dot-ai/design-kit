/** @jsxImportSource solid-js */
import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import {
    ErrorSummary,
    ErrorSummaryTitle,
    ErrorSummaryBody,
    ErrorSummaryList,
    ErrorSummaryItem,
} from "@i-dot-ai-npm/component-library-solid";
import type { ErrorSummaryData } from "../match-govuk-mappings.js";

export function renderErrorSummary(data: ErrorSummaryData): JSX.Element {
    return (
        <ErrorSummary>
            <ErrorSummaryTitle>{data.titleText}</ErrorSummaryTitle>
            <ErrorSummaryBody>
                <Show when={data.descriptionText !== undefined}>
                    <p>{data.descriptionText}</p>
                </Show>
                <Show when={data.errorList.length > 0}>
                    <ErrorSummaryList>
                        <For each={data.errorList}>
                            {(item) => <ErrorSummaryItem href={item.href}>{item.text}</ErrorSummaryItem>}
                        </For>
                    </ErrorSummaryList>
                </Show>
            </ErrorSummaryBody>
        </ErrorSummary>
    );
}
