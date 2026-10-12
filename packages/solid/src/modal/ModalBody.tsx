/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ModalBodyProps = JSX.IntrinsicElements["div"] & {
    class?: string;
    children?: JSX.Element;
};

export default function ModalBody(props: ModalBodyProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () => ["iai-modal__body", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <div class={classes()} {...rest}>
            {local.children}
        </div>
    );
}
