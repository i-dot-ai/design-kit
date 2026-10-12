import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type ListProps = ComponentPropsWithoutRef<'ol'> & ComponentPropsWithoutRef<'ul'> & {
    spaced?: boolean;
    numbered?: string;
    class?: string;
    children?: ReactNode;
};

export default function List({ spaced, numbered, class: className, children, ...rest }: ListProps) {

    return (
        numbered ? (
            <ol className={["govuk-list govuk-list--number", spaced ? "govuk-list--spaced" : "", className ?? ""].filter(Boolean).join(" ")} {...rest}>
                {children ?? ""}
            </ol>
        ) : (
            <ul className={["govuk-list", spaced ? "govuk-list--spaced" : "", className ?? ""].filter(Boolean).join(" ")} {...rest}>
                {children ?? ""}
            </ul>
        )
    );
}
