import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type PhaseBannerProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function PhaseBanner({ class: className, children, ...rest }: PhaseBannerProps) {
    const classes = ["govuk-phase-banner govuk-width-container", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            <p className="govuk-phase-banner__content">
                {children ?? ""}
            </p>
        </div>
    );
}
