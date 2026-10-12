/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type CookieBannerProps = JSX.IntrinsicElements['div'] & {
    class?: string;
    children?: JSX.Element;
};

export default function CookieBanner(props: CookieBannerProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-cookie-banner", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <div class={classes()} data-nosnippet="" role="region" aria-label="Cookie banner" {...rest}>
            {local.children ?? ""}
        </div>
    );
}
