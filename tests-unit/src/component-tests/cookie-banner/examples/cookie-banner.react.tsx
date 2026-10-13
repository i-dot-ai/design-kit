import type { ReactNode } from "react";
import {
    CookieBanner,
    CookieBannerMessage,
    CookieBannerHeading,
    CookieBannerContent,
    CookieBannerActions,
    Button,
} from "@i-dot-ai-npm/component-library-react";
import type { CookieAction, CookieMessage, CookieBannerData } from "../match-govuk-mappings.js";

const headingHtmlContent: Record<string, ReactNode> = {
    "Cookies on <span>my service</span>": <>Cookies on <span>my service</span></>,
};

const bodyHtmlContent: Record<string, ReactNode> = {
    "with html": (
        <>
            <p className="govuk-body">We use cookies in <span>our service</span>.</p>
            <p className="govuk-body">We’d like to use analytics cookies so we can understand how you use the Design System and make improvements.</p>
        </>
    ),
};

function Action({ action }: { action: CookieAction }): ReactNode {
    if (action.href !== undefined) {
        return <a className="govuk-link" href={action.href}>{action.text}</a>;
    }
    return (
        <Button type={action.type} name={action.name} value={action.value}>
            {action.text}
        </Button>
    );
}

function Message({ message, name }: { message: CookieMessage; name: string }): ReactNode {
    return (
        <CookieBannerMessage {...(message.role ? { role: message.role } : {})}>
            <div className="govuk-grid-row">
                <div className="govuk-grid-column-two-thirds">
                    {message.headingHtml !== undefined ? (
                        <CookieBannerHeading>{headingHtmlContent[message.headingHtml]}</CookieBannerHeading>
                    ) : message.headingText !== undefined ? (
                        <CookieBannerHeading>{message.headingText}</CookieBannerHeading>
                    ) : null}
                    <CookieBannerContent>
                        {message.html !== undefined ? (
                            bodyHtmlContent[name]
                        ) : (
                            <p className="govuk-body">{message.text}</p>
                        )}
                    </CookieBannerContent>
                </div>
            </div>
            {message.actions.length > 0 && (
                <CookieBannerActions>
                    {message.actions.map((action, i) => (
                        <Action key={i} action={action} />
                    ))}
                </CookieBannerActions>
            )}
        </CookieBannerMessage>
    );
}

export function renderCookieBanner(data: CookieBannerData): ReactNode {
    return (
        <CookieBanner>
            {data.messages.map((message, i) => (
                <Message key={i} message={message} name={data.name} />
            ))}
        </CookieBanner>
    );
}
