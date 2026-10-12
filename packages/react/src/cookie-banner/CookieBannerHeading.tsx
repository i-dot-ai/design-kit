import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CookieBannerHeadingProps = ComponentPropsWithoutRef<'h2'> & {
    class?: string;
    children?: ReactNode;
};

export default function CookieBannerHeading({ class: className, children, ...rest }: CookieBannerHeadingProps) {
    const classes = ["govuk-cookie-banner__heading govuk-heading-m", className ?? ""].filter(Boolean).join(" ");

    return (
        <h2 className={classes} {...rest}>
            {children ?? ""}
        </h2>
    );
}
