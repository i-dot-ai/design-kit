/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type NotificationBannerTitleProps = JSX.IntrinsicElements['h2'] & {
    class?: string;
    children?: JSX.Element;
};

export default function NotificationBannerTitle(props: NotificationBannerTitleProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-notification-banner__title", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <h2 class={classes()} id="govuk-notification-banner-title" {...rest}>
            {local.children ?? ""}
        </h2>
    );
}
