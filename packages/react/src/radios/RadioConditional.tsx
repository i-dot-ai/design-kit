import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type RadioConditionalProps = ComponentPropsWithoutRef<'div'> & {
    hidden?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function RadioConditional({ hidden = true, class: className, children, ...rest }: RadioConditionalProps) {
    const classes = [
        "govuk-radios__conditional",
        hidden ? "govuk-radios__conditional--hidden" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes} {...rest}>
            {children ?? ""}
        </div>
    );
}
