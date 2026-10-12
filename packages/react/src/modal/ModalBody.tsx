import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ModalBodyProps = ComponentPropsWithoutRef<"div"> & {
    class?: string;
    children?: ReactNode;
};

export default function ModalBody({ class: className, children, ...rest }: ModalBodyProps) {
    const classes = ["iai-modal__body", className ?? ""].filter(Boolean).join(" ");

    return (
        <div className={classes} {...rest}>
            {children}
        </div>
    );
}
