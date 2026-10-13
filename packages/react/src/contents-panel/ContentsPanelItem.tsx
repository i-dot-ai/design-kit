import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ContentsPanelItemProps = ComponentPropsWithoutRef<'li'> & {
    href?: string;
    current?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function ContentsPanelItem({
    href,
    current = false,
    class: className,
    children,
    ...rest
}: ContentsPanelItemProps) {
    const itemClasses = [
        "contents-panel__list-item",
        current ? "contents-panel__list-item--current" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <li className={itemClasses} {...rest}>
            <a
                className="contents-panel__link govuk-link govuk-link--no-visited-state govuk-link--no-underline"
                href={href}
                aria-current={current ? "page" : undefined}
            >
                {children}
            </a>
        </li>
    );
}
