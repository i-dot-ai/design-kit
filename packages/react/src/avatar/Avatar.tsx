import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type AvatarProps = ComponentPropsWithoutRef<'span'> & {
    fullName?: string;
    size?: "small" | "large";
    inverse?: boolean;
    class?: string;
    children?: ReactNode;
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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
    >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
    </svg>
);

export default function Avatar({ fullName, size, inverse, class: className, children, ...rest }: AvatarProps) {
    const classes = ["iai-avatar", size ? `iai-avatar--${size}` : "", inverse ? "iai-avatar--inverse" : "", className ?? ""].filter(Boolean).join(" ");

    return (
        <span className={classes} {...rest}>
            {children ?? (fullName?.trim() ? initials(fullName) : <FallbackIcon />)}
        </span>
    );
}
