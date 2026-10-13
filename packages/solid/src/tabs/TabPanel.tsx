/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type TabPanelProps = JSX.IntrinsicElements['div'] & {
    hidden?: boolean;
    class?: string;
    children?: JSX.Element;
};

export default function TabPanel(props: TabPanelProps) {
    const [local, rest] = splitProps(props, ["hidden", "class", "children"]);
    const classes = () =>
        [
            "govuk-tabs__panel",
            local.hidden ? "govuk-tabs__panel--hidden" : "",
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <div class={classes()} {...rest}>
            {local.children ?? ""}
        </div>
    );
}
