/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type CharacterCountProps = JSX.IntrinsicElements['textarea'] & {
    class?: string;
    children?: JSX.Element;
};

export default function CharacterCount(props: CharacterCountProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-textarea govuk-js-character-count", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <textarea class={classes()} {...rest}>{local.children ?? ""}</textarea>
    );
}
