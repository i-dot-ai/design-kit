import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CharacterCountProps = ComponentPropsWithoutRef<'textarea'> & {
    class?: string;
    children?: ReactNode;
};

export default function CharacterCount({ class: className, children, ...rest }: CharacterCountProps) {
    const classes = ["govuk-textarea govuk-js-character-count", className ?? ""].filter(Boolean).join(" ");

    return (
        <textarea className={classes} {...rest}>{children ?? ""}</textarea>
    );
}
