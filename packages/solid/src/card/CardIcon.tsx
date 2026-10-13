/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type CardIconProps = JSX.IntrinsicElements['div'] & {
    class?: string;
    children?: JSX.Element;
};

export default function CardIcon(props: CardIconProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["iai-card__icon", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <div class={classes()} aria-hidden="true" {...rest}>
            {local.children ?? ""}
        </div>
    );
}
