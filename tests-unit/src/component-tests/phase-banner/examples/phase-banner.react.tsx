import type { ReactNode } from "react";
import { PhaseBanner, PhaseBannerText, Tag } from "@i-dot-ai-npm/component-library-react";
import type { PhaseBannerData } from "../match-govuk-mappings.js";

// The govuk fixture body carries raw HTML (an inline link). React can't inject
// a raw HTML string as unwrapped content, so it is re-authored as real elements
// here, keyed by fixture name (mirrors the accordion content pattern).
const bodyContent: Record<string, ReactNode> = {
    default: (
        <>
            This is a new service - your{" "}
            <a href="#" className="govuk-link">feedback</a> will help us to improve it.
        </>
    ),
};

export function renderPhaseBanner(data: PhaseBannerData): ReactNode {
    return (
        <PhaseBanner>
            <Tag class="govuk-phase-banner__content__tag">{data.tagText}</Tag>
            <PhaseBannerText>
                {data.bodyHtml ? bodyContent[data.name] : data.bodyText}
            </PhaseBannerText>
        </PhaseBanner>
    );
}
