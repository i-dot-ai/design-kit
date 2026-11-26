import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type AvatarGroupProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function AvatarGroup({ class: className, children, ...rest }: AvatarGroupProps) {
    const classes = ["iai-avatar-group", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
