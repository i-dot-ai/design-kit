/** @jsxImportSource solid-js */

import type { JSX } from "solid-js";
import { Feedback } from "@i-dot-ai-npm/component-library-solid";
import type { FeedbackData } from "../match-govuk-mappings.js";

// Raw-HTML fixture bodies re-authored as elements (see accordion pattern).
const bodyContent: Record<string, JSX.Element> = {
    default: (
        <p class="govuk-body">
            Tell us about your experience using this service.{" "}
            <a href="#" class="govuk-link">Give us your feedback</a>
        </p>
    ),
    "silly example": (
        <>
            <p class="govuk-body">Tell us about your experience using this service.</p>
            <p class="govuk-body">
                Click this cool link to <a href="#" class="govuk-link">give us your feedback</a>.
            </p>
            <p class="govuk-body">There's another paragraph here.</p>
            <ul class="govuk-list govuk-list--bullet">
                <li>There is also a list</li>
                <li>With items in</li>
                <li>How strange!</li>
            </ul>
        </>
    ),
};

export function renderFeedback(data: FeedbackData): JSX.Element {
    return (
        <Feedback title={data.titleHtml ?? data.titleText} class={data.classes}>
            {data.html ? bodyContent[data.name] : data.text}
        </Feedback>
    );
}
