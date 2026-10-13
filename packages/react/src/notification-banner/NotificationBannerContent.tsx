import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type NotificationBannerContentProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function NotificationBannerContent({ class: className, children, ...rest }: NotificationBannerContentProps) {
    const classes = ["govuk-notification-banner__content", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
