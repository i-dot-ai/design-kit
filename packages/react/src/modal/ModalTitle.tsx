import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ModalTitleProps = ComponentPropsWithoutRef<"h2"> & {
    class?: string;
    children?: ReactNode;
};

export default function ModalTitle({ class: className, children, ...rest }: ModalTitleProps) {
    const classes = ["govuk-heading-m", "iai-modal__title", className ?? ""]
        .filter(Boolean)
        .join(" ");

    return (
        <h2 className={classes} {...rest}>
            {children}
        </h2>
    );
}
