/** @jsxImportSource solid-js */
import type { JSX } from "solid-js";
import { Breadcrumbs, BreadcrumbItem } from "@i-dot-ai-npm/component-library-solid";
import type { BreadcrumbsData } from "../match-govuk-mappings.js";

export function renderBreadcrumbs(data: BreadcrumbsData): JSX.Element {
    return (
        <Breadcrumbs inverse={data.inverse} collapseOnMobile={data.collapseOnMobile}>
            {data.items.map((item) => (
                <BreadcrumbItem href={item.href}>{item.text}</BreadcrumbItem>
            ))}
        </Breadcrumbs>
    );
}
