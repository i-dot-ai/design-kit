/** @jsxImportSource solid-js */
import type { JSX } from "solid-js";
import { PhaseBanner, PhaseBannerText, Tag } from "@i-dot-ai-npm/component-library-solid";
import type { PhaseBannerData } from "../match-govuk-mappings.js";

// See the React example for why raw-HTML bodies are re-authored as elements.
const bodyContent: Record<string, JSX.Element> = {
    default: (
        <>
            This is a new service - your{" "}
            <a href="#" class="govuk-link">feedback</a> will help us to improve it.
        </>
    ),
};

export function renderPhaseBanner(data: PhaseBannerData): JSX.Element {
    return (
        <PhaseBanner>
            <Tag class="govuk-phase-banner__content__tag">{data.tagText}</Tag>
            <PhaseBannerText>
                {data.bodyHtml ? bodyContent[data.name] : data.bodyText}
            </PhaseBannerText>
        </PhaseBanner>
    );
}
