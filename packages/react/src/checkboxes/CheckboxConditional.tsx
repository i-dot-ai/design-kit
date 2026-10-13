import type { ComponentPropsWithoutRef, ReactNode } from 'react';

type CheckboxConditionalProps = ComponentPropsWithoutRef<'div'> & {
    hidden?: boolean;
    class?: string;
    children?: ReactNode;
};

export default function CheckboxConditional({ hidden = true, class: className, children, ...rest }: CheckboxConditionalProps) {
    const classes = [
        "govuk-checkboxes__conditional",
        hidden ? "govuk-checkboxes__conditional--hidden" : "",
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
