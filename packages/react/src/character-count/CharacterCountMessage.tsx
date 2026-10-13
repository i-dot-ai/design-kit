import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CharacterCountMessageProps = ComponentPropsWithoutRef<'div'> & {
    class?: string;
    children?: ReactNode;
};

export default function CharacterCountMessage({ class: className, children, ...rest }: CharacterCountMessageProps) {
    const classes = ["govuk-hint govuk-character-count__message", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
