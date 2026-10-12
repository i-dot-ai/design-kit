/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type BreadcrumbsProps = JSX.IntrinsicElements['nav'] & {
    inverse?: boolean;
    collapseOnMobile?: boolean;
    class?: string;
    children?: JSX.Element;
};

export default function Breadcrumbs(props: BreadcrumbsProps) {
    const [local, rest] = splitProps(props, ["inverse", "collapseOnMobile", "class", "children"]);
    const classes = () =>
        [
            "govuk-breadcrumbs",
            local.inverse ? "govuk-breadcrumbs--inverse" : "",
            local.collapseOnMobile ? "govuk-breadcrumbs--collapse-on-mobile" : "",
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <nav class={classes()} aria-label="Breadcrumb" {...rest}>
            <ol class="govuk-breadcrumbs__list">
                {local.children ?? ""}
            </ol>
        </nav>
    );
}
