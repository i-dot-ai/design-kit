import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TaskListStatusProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function TaskListStatus({ class: className, children, ...rest }: TaskListStatusProps) {
    const classes = ["govuk-task-list__status", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
