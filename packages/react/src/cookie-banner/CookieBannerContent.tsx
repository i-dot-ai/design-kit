import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CookieBannerContentProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function CookieBannerContent({ class: className, children, ...rest }: CookieBannerContentProps) {
    const classes = ["govuk-cookie-banner__content", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
