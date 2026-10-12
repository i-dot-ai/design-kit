/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type CheckboxDividerProps = {
    class?: string;
    children?: JSX.Element;
};

export default function CheckboxDivider(props: CheckboxDividerProps) {
    const [local] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-checkboxes__divider", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <div class={classes()}>
            {local.children ?? "or"}
        </div>
    );
}
