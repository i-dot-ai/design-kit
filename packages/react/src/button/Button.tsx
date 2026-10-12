import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonProps = Omit<ComponentPropsWithoutRef<'a'> & ComponentPropsWithoutRef<'button'>, 'type' | 'href'> & {
    secondary?: boolean;
    tertiary?: boolean;
    warning?: boolean;
    inverse?: boolean;
    small?: boolean;
    startButton?: boolean;
    href?: string;
    type?: "button" | "reset" | "submit";
    class?: string;
    children?: ReactNode;
};

const StartIcon = () => (
    <svg
        className="govuk-button__start-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="17.5"
        height="19"
        viewBox="0 0 33 40"
        aria-hidden="true"
        focusable="false"
    >
        <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
    </svg>
);

export default function Button({ secondary, tertiary, warning, inverse, small, startButton, href, type, class: className, children, ...rest }: ButtonProps) {
    const classes = ["govuk-button", secondary ? "govuk-button--secondary" : "", warning ? "govuk-button--warning" : "", inverse ? "govuk-button--inverse" : "", tertiary ? "govuk-button--tertiary" : "", small ? "govuk-button--small" : "", startButton ? "govuk-button--start" : "", className ?? ""].filter(Boolean).join(" ");

    return (
        href ? (
            <a href={href} role="button" draggable="false" className={classes} data-module="govuk-button" {...rest}>
                {children ?? ""}
                {startButton ? <StartIcon /> : null}
            </a>
        ) : (
            <button type={type ?? "submit"} className={classes} data-module="govuk-button" {...rest}>
                {children ?? ""}
                {startButton ? <StartIcon /> : null}
            </button>
        )
    );
}
