import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CookieBannerProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function CookieBanner({ class: className, children, ...rest }: CookieBannerProps) {
    const classes = ["govuk-cookie-banner", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} data-nosnippet="" role="region" aria-label="Cookie banner" {...rest}>
            {children ?? ""}
        </div>
    );
}
