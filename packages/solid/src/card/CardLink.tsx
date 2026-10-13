/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type CardLinkProps = JSX.IntrinsicElements['a'] & {
    class?: string;
    children?: JSX.Element;
};

export default function CardLink(props: CardLinkProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["iai-card__link", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <a class={classes()} {...rest}>
            {local.children ?? ""}
        </a>
    );
}
