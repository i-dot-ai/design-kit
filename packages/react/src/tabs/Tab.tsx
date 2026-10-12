import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type TabProps = ComponentPropsWithoutRef<'a'> & {
    selected?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function Tab({ selected, class: className, children, ...rest }: TabProps) {
    const classes = ["govuk-tabs__tab", className ?? ""].filter(Boolean).join(" ");

    return (
        <li className={["govuk-tabs__list-item", selected ? "govuk-tabs__list-item--selected" : ""].filter(Boolean).join(" ")}>
            <a className={classes} {...rest}>
                {children ?? ""}
            </a>
        </li>
    );
}
