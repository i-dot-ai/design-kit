/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type CardProps = JSX.IntrinsicElements['div'] & {
    secondary?: boolean;
    class?: string;
    children?: JSX.Element;
};

export default function Card(props: CardProps) {
    const [local, rest] = splitProps(props, ["secondary", "class", "children"]);
    const classes = () =>
        [
            "iai-card",
            local.secondary ? "iai-card--secondary" : "",
            local.class ?? "",
        ]
            .filter(Boolean)
            .join(" ");

    return (
        <div class={classes()} {...rest}>
            {local.children ?? ""}
        </div>
    );
}
