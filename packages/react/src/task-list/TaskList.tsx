import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TaskListProps = ComponentPropsWithoutRef<'ul'> & {
    class?: string;
    children?: ReactNode;
};

export default function TaskList({ class: className, children, ...rest }: TaskListProps) {
    const classes = ["govuk-task-list", className ?? ""].filter(Boolean).join(" ");

    return (
        <ul className={classes} {...rest}>
            {children ?? ""}
        </ul>
    );
}
