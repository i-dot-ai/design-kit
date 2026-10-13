/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type PhaseBannerProps = JSX.IntrinsicElements['div'] & {
    class?: string;
    children?: JSX.Element;
};

export default function PhaseBanner(props: PhaseBannerProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-phase-banner govuk-width-container", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <div class={classes()} {...rest}>
            <p class="govuk-phase-banner__content">
                {local.children ?? ""}
            </p>
        </div>
    );
}
