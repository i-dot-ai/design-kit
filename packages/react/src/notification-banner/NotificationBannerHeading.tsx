import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type NotificationBannerHeadingProps = ComponentPropsWithoutRef<'p'> & {
    class?: string;
    children?: ReactNode;
};

export default function NotificationBannerHeading({ class: className, children, ...rest }: NotificationBannerHeadingProps) {
    const classes = ["govuk-notification-banner__heading", className ?? ""].filter(Boolean).join(" ");

    return (
        <p className={classes} {...rest}>
            {children ?? ""}
        </p>
    );
}
