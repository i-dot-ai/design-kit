import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CookieBannerActionsProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function CookieBannerActions({ class: className, children, ...rest }: CookieBannerActionsProps) {
    const classes = ["govuk-button-group", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
