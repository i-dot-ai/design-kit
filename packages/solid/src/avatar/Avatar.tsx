/** @jsxImportSource solid-js */

import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

type AvatarProps = JSX.IntrinsicElements['span'] & {
    fullName?: string;
    size?: "small" | "large";
    inverse?: boolean;
};

function initials(fullName: string): string {
    return fullName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();
}

const FallbackIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        // @ts-ignore-next-line: needed to match govuk html exactly
        attr:focusable="false"
    >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
    </svg>
);

export default function Avatar(props: AvatarProps) {
    const [local, rest] = splitProps(props, ["fullName", "size", "inverse", "class", "children"]);
    const classes = () =>
        ["iai-avatar", local.size ? `iai-avatar--${local.size}` : "", local.inverse ? "iai-avatar--inverse" : "", local.class ?? ""].filter(Boolean).join(" ");

    return (
        <span class={classes()} {...rest}>
            {local.children ?? (local.fullName?.trim() ? initials(local.fullName) : <FallbackIcon />)}
        </span>
    );
}
