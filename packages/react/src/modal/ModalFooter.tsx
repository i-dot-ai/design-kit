import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ModalFooterProps = ComponentPropsWithoutRef<"div"> & {
    class?: string;
    children?: ReactNode;
};

export default function ModalFooter({ class: className, children, ...rest }: ModalFooterProps) {
    const classes = ["iai-modal__footer", "govuk-button-group", className ?? ""]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={classes} {...rest}>
            {children}
        </div>
    );
}
