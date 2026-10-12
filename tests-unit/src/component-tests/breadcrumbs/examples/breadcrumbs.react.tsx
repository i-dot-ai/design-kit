import type { ReactNode } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@i-dot-ai-npm/component-library-react";
import type { BreadcrumbsData } from "../match-govuk-mappings.js";

export function renderBreadcrumbs(data: BreadcrumbsData): ReactNode {
    return (
        <Breadcrumbs inverse={data.inverse} collapseOnMobile={data.collapseOnMobile}>
            {data.items.map((item, i) => (
                <BreadcrumbItem key={i} href={item.href}>
                    {item.text}
                </BreadcrumbItem>
            ))}
        </Breadcrumbs>
    );
}
