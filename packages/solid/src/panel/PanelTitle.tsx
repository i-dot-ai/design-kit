/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type PanelTitleProps = JSX.IntrinsicElements['h1'] & {
    class?: string;
    children?: JSX.Element;
};

export default function PanelTitle(props: PanelTitleProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-panel__title", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <h1 class={classes()} {...rest}>
            {local.children}
        </h1>
    );
}
