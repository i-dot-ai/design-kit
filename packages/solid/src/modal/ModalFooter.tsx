/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ModalFooterProps = JSX.IntrinsicElements["div"] & {
    class?: string;
    children?: JSX.Element;
};

export default function ModalFooter(props: ModalFooterProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["iai-modal__footer", "govuk-button-group", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <div class={classes()} {...rest}>
            {local.children}
        </div>
    );
}
