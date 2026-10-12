/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ToggleProps = JSX.IntrinsicElements['input'] & {
    class?: string;
};

export default function Toggle(props: ToggleProps) {
    const [local, rest] = splitProps(props, ["class"]);
    const classes = () =>
        ["iai-toggle__input", local.class ?? ""].filter(Boolean).join(" ");

    return <input class={classes()} type="checkbox" role="switch" {...rest} />;
}
