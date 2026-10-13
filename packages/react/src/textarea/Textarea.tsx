import type { ComponentPropsWithoutRef } from 'react';

type TextareaProps = Omit<ComponentPropsWithoutRef<'textarea'>, 'value'> & {
    error?: boolean;
    subtle?: boolean;
    value?: string;
    class?: string;
};

export default function Textarea({ error, subtle, value, class: className, ...rest }: TextareaProps) {
    const classes = [
        "govuk-textarea",
        error ? "govuk-textarea--error" : "",
        subtle ? "govuk-textarea--subtle" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <textarea className={classes} defaultValue={value} {...rest}></textarea>
    );
}
