import type { ReactNode } from "react";
import { ServiceNavigation, ServiceNavigationItem } from "@i-dot-ai-npm/component-library-react";
import type { NavItem, ServiceNavData } from "../match-govuk-mappings.js";

// Re-authored raw HTML that appears in some fixtures (React can't inject a raw
// HTML string as unwrapped content).
const itemHtml: Record<string, ReactNode> = {
    "<em>Navigation item 1</em>": <em>Navigation item 1</em>,
    "<em>Navigation item 2</em>": <em>Navigation item 2</em>,
    "<em>Navigation item 3</em>": <em>Navigation item 3</em>,
};

function LanguageNav({ inverse }: { inverse?: boolean }): ReactNode {
    const cls = ["govuk-language-navigation", inverse ? "govuk-language-navigation--inverse" : ""]
        .filter(Boolean)
        .join(" ");
    return (
        <nav className={cls} aria-label="Language navigation">
            <ul className="govuk-language-navigation__list">
                <li className="govuk-language-navigation__list-item">
                    <span className="govuk-language-navigation__text" lang="en" aria-current="true">English</span>
                </li>
                <li className="govuk-language-navigation__list-item">
                    <a className="govuk-language-navigation__link" href="#/cy" lang="cy" hrefLang="cy" rel="alternate">Cymraeg</a>
                </li>
            </ul>
        </nav>
    );
}

/** Re-author the raw end-slot HTML for the fixtures that use one. */
function endSlot(data: ServiceNavData): ReactNode {
    if (data.endSlotHtml === undefined) return undefined;
    if (data.endSlotHtml.includes("govuk-language-navigation")) {
        return <LanguageNav inverse={data.endSlotHtml.includes("--inverse")} />;
    }
    return <div>[end]</div>;
}

function itemContent(item: NavItem): ReactNode {
    if (item.html !== undefined) return itemHtml[item.html] ?? item.html;
    return item.text;
}

export function renderServiceNav(data: ServiceNavData): ReactNode {
    return (
        <ServiceNavigation
            class={data.classes}
            serviceName={data.serviceName}
            serviceUrl={data.serviceUrl}
            hasNavigation={data.hasNavigation}
            collapseNavigationOnMobile={data.collapseNavigationOnMobile}
            endSlot={endSlot(data)}
            endSlotInline={data.endSlotInline}
        >
            {data.items.map((item, i) => (
                <ServiceNavigationItem key={i} href={item.href} current={item.current} active={item.active}>
                    {itemContent(item)}
                </ServiceNavigationItem>
            ))}
        </ServiceNavigation>
    );
}
