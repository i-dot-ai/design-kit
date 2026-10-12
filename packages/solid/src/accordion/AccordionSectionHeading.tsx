/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type AccordionSectionHeadingProps = JSX.IntrinsicElements['span'] & {
    class?: string;
    children?: JSX.Element;
};

export default function AccordionSectionHeading(props: AccordionSectionHeadingProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-accordion__section-button", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <h2 class="govuk-accordion__section-heading">
            <span class={classes()} {...rest}>
                {local.children ?? ""}
            </span>
        </h2>
    );
}
