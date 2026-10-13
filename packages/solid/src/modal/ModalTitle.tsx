/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ModalTitleProps = JSX.IntrinsicElements["h2"] & {
    class?: string;
    children?: JSX.Element;
};

export default function ModalTitle(props: ModalTitleProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-heading-m", "iai-modal__title", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <h2 class={classes()} {...rest}>
            {local.children}
        </h2>
    );
}
