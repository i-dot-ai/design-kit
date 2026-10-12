import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TaskListLinkProps = ComponentPropsWithoutRef<'a'> & {
    class?: string;
    children?: ReactNode;
};

export default function TaskListLink({ class: className, children, ...rest }: TaskListLinkProps) {
    const classes = ["govuk-link govuk-task-list__link", className ?? ""].filter(Boolean).join(" ");

    return (
        <a className={classes} {...rest}>
            {children ?? ""}
        </a>
    );
}
