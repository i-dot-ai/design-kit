/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ContentsPanelProps = JSX.IntrinsicElements['nav'] & {
    heading?: string;
    headingId?: string;
    class?: string;
    children?: JSX.Element;
};

export default function ContentsPanel(props: ContentsPanelProps) {
    const [local, rest] = splitProps(props, ["heading", "headingId", "class", "children"]);
    const headingId = () => local.headingId ?? "contents-panel-heading";
    const classes = () =>
        ["contents-panel", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <nav class={classes()} aria-labelledby={headingId()} {...rest}>
            <h2 class="govuk-visually-hidden" id={headingId()}>
                {local.heading ?? "Pages in this section"}
            </h2>
            {local.children}
        </nav>
    );
}
