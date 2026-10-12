/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type NotificationBannerHeadingProps = JSX.IntrinsicElements['p'] & {
    class?: string;
    children?: JSX.Element;
};

export default function NotificationBannerHeading(props: NotificationBannerHeadingProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-notification-banner__heading", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <p class={classes()} {...rest}>
            {local.children ?? ""}
        </p>
    );
}
