/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type PanelProps = JSX.IntrinsicElements['div'] & {
    class?: string;
    children?: JSX.Element;
};

export default function Panel(props: PanelProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () => {
        const isInterruption = (local.class ?? "").includes("govuk-panel--interruption");
        return [
            "govuk-panel",
            isInterruption ? "" : "govuk-panel--confirmation",
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");
    };

    return (
        <div class={classes()} {...rest}>
            {local.children}
        </div>
    );
}
