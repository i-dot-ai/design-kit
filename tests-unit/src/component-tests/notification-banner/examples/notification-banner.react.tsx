import type { ReactNode } from "react";
import {
    NotificationBanner,
    NotificationBannerHeader,
    NotificationBannerTitle,
    NotificationBannerContent,
    NotificationBannerHeading,
} from "@i-dot-ai-npm/component-library-react";
import type { NotificationBannerData } from "../match-govuk-mappings.js";

// Re-authored raw HTML content, keyed by fixture name.
const htmlContent: Record<string, ReactNode> = {
    "with text as html": (
        <>
            <h3 className="govuk-notification-banner__heading">This publication was withdrawn on 7 March 2014</h3>
            <p className="govuk-body">The following 4 files are available</p>
            <ul className="govuk-list govuk-list--bullet govuk-!-margin-bottom-0">
                <li><a href="#" className="govuk-notification-banner__link">government-strategy.pdf</a></li>
                <li><a href="#" className="govuk-notification-banner__link">government-strategy-v2.pdf</a></li>
                <li><a href="#" className="govuk-notification-banner__link">government-strategy-v3-FINAL.pdf</a></li>
                <li><a href="#" className="govuk-notification-banner__link">government-strategy-v4-FINAL-v2.pdf</a></li>
            </ul>
        </>
    ),
    "with lots of content": (
        <>
            <h3 className="govuk-notification-banner__heading">Check if you need to apply the reverse charge to this application</h3>
            <p className="govuk-body">
                You will have to apply the <a href="#" className="govuk-notification-banner__link">reverse charge</a> if the applicant supplies any of these services:
            </p>
            <ul className="govuk-list govuk-list--bullet govuk-list--spaced">
                <li>constructing, altering, repairing, extending, demolishing or dismantling buildings or structures (whether permanent or not), including offshore installation services</li>
                <li>constructing, altering, repairing, extending, demolishing of any works forming, or planned to form, part of the land, including (in particular) walls, roadworks, power lines, electronic communications equipment, aircraft runways, railways, inland waterways, docks and harbours</li>
            </ul>
        </>
    ),
};

export function renderNotificationBanner(data: NotificationBannerData): ReactNode {
    return (
        <NotificationBanner success={data.success ? "true" : undefined}>
            <NotificationBannerHeader>
                <NotificationBannerTitle>{data.titleText}</NotificationBannerTitle>
            </NotificationBannerHeader>
            <NotificationBannerContent>
                {data.html !== undefined ? (
                    htmlContent[data.name]
                ) : (
                    <NotificationBannerHeading>{data.text}</NotificationBannerHeading>
                )}
            </NotificationBannerContent>
        </NotificationBanner>
    );
}
