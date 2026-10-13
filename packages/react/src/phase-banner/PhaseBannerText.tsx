import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type PhaseBannerTextProps = ComponentPropsWithoutRef<'span'> & {
    class?: string;
    children?: ReactNode;
};

export default function PhaseBannerText({ class: className, children, ...rest }: PhaseBannerTextProps) {
    const classes = ["govuk-phase-banner__text", className ?? ""].filter(Boolean).join(" ");

    return (
        <span className={classes} {...rest}>
            {children ?? ""}
        </span>
    );
}
