import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TaskListHintProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function TaskListHint({ class: className, children, ...rest }: TaskListHintProps) {
    const classes = ["govuk-task-list__hint", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
