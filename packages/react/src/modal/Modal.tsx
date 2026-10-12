import { useEffect, useRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ModalProps = Omit<ComponentPropsWithoutRef<"dialog">, "onClose"> & {
    class?: string;
    /** Controls whether the modal is open. */
    open?: boolean;
    /**
     * Called when the modal requests to close (Esc, backdrop click, or a
     * `[data-iai-modal-close]` button). Update your `open` state here.
     */
    onClose?: () => void;
    children?: ReactNode;
};

export default function Modal({
    class: className,
    open = false,
    onClose,
    children,
    ...rest
}: ModalProps) {
    const ref = useRef<HTMLDialogElement>(null);

    const classes = ["iai-modal", className ?? ""].filter(Boolean).join(" ");

    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;
        void import("@i-dot-ai-npm/component-library-frontend").then(
            ({ initModal, openModal, closeModal }) => {
                if (ref.current !== dialog) return;
                initModal(dialog);
                if (open) openModal(dialog);
                else closeModal(dialog);
            },
        );
    }, [open]);

    useEffect(() => {
        const dialog = ref.current;
        if (!dialog || !onClose) return;
        const handler = () => onClose();
        dialog.addEventListener("close", handler);
        return () => dialog.removeEventListener("close", handler);
    }, [onClose]);

    return (
        <dialog ref={ref} className={classes} tabIndex={-1} data-module="iai-modal" {...rest}>
            <div className="iai-modal__container">{children}</div>
        </dialog>
    );
}
