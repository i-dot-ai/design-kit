import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CookieBannerMessageProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function CookieBannerMessage({ class: className, children, ...rest }: CookieBannerMessageProps) {
    const classes = ["govuk-cookie-banner__message govuk-width-container", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
