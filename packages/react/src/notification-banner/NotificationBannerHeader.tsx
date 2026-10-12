import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type NotificationBannerHeaderProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function NotificationBannerHeader({ class: className, children, ...rest }: NotificationBannerHeaderProps) {
    const classes = ["govuk-notification-banner__header", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
