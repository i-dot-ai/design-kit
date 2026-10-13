/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type PhaseBannerTextProps = JSX.IntrinsicElements['span'] & {
    class?: string;
    children?: JSX.Element;
};

export default function PhaseBannerText(props: PhaseBannerTextProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-phase-banner__text", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <span class={classes()} {...rest}>
            {local.children ?? ""}
        </span>
    );
}
