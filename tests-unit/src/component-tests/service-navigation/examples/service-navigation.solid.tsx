/** @jsxImportSource solid-js */
import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import { ServiceNavigation, ServiceNavigationItem } from "@i-dot-ai-npm/component-library-solid";
import type { NavItem, ServiceNavData } from "../match-govuk-mappings.js";

const itemHtml: Record<string, JSX.Element> = {
    "<em>Navigation item 1</em>": <em>Navigation item 1</em>,
    "<em>Navigation item 2</em>": <em>Navigation item 2</em>,
    "<em>Navigation item 3</em>": <em>Navigation item 3</em>,
};

function LanguageNav(props: { inverse?: boolean }): JSX.Element {
    const cls = () =>
        ["govuk-language-navigation", props.inverse ? "govuk-language-navigation--inverse" : ""]
            .filter(Boolean)
            .join(" ");
    return (
        <nav class={cls()} aria-label="Language navigation">
            <ul class="govuk-language-navigation__list">
                <li class="govuk-language-navigation__list-item">
                    <span class="govuk-language-navigation__text" lang="en" aria-current="true">English</span>
                </li>
                <li class="govuk-language-navigation__list-item">
                    <a class="govuk-language-navigation__link" href="#/cy" lang="cy" hreflang="cy" rel="alternate">Cymraeg</a>
                </li>
            </ul>
        </nav>
    );
}

function endSlot(data: ServiceNavData): JSX.Element {
    if (data.endSlotHtml === undefined) return undefined;
    if (data.endSlotHtml.includes("govuk-language-navigation")) {
        return <LanguageNav inverse={data.endSlotHtml.includes("--inverse")} />;
    }
    return <div>[end]</div>;
}

function itemContent(item: NavItem): JSX.Element {
    if (item.html !== undefined) return itemHtml[item.html] ?? item.html;
    return item.text;
}

export function renderServiceNav(data: ServiceNavData): JSX.Element {
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
            <For each={data.items}>
                {(item) => (
                    <ServiceNavigationItem href={item.href} current={item.current} active={item.active}>
                        {itemContent(item)}
                    </ServiceNavigationItem>
                )}
            </For>
        </ServiceNavigation>
    );
}
