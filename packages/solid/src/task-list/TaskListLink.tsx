/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type TaskListLinkProps = JSX.IntrinsicElements['a'] & {
    class?: string;
    children?: JSX.Element;
};

export default function TaskListLink(props: TaskListLinkProps) {
    const [local, rest] = splitProps(props, ["class", "children"]);
    const classes = () =>
        ["govuk-link govuk-task-list__link", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <a class={classes()} {...rest}>
            {local.children ?? ""}
        </a>
    );
}
