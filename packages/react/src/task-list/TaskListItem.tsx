import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TaskListItemProps = ComponentPropsWithoutRef<'li'> & {
    withLink?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function TaskListItem({ withLink, class: className, children, ...rest }: TaskListItemProps) {
    const classes = [
        "govuk-task-list__item",
        withLink ? "govuk-task-list__item--with-link" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <li className={classes} {...rest}>
            {children ?? ""}
        </li>
    );
}
