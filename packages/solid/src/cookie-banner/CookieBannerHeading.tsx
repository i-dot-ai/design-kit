/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type CookieBannerHeadingProps = JSX.IntrinsicElements['h2'] & {
    class?: string;
    children?: JSX.Element;
};

export default function CookieBannerHeading(props: CookieBannerHeadingProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-cookie-banner__heading govuk-heading-m", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <h2 class={classes()} {...rest}>
            {local.children ?? ""}
        </h2>
    );
}
