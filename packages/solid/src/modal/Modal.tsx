/** @jsxImportSource solid-js */

import { createEffect, onCleanup, splitProps } from "solid-js";
import type { JSX } from "solid-js";

type ModalProps = Omit<JSX.IntrinsicElements["dialog"], "onClose"> & {
    class?: string;
    /** Controls whether the modal is open. */
    open?: boolean;
    /**
     * Called when the modal requests to close (Esc, backdrop click, or a
     * `[data-iai-modal-close]` button). Update your `open` state here.
     */
    onClose?: () => void;
    children?: JSX.Element;
};

export default function Modal(props: ModalProps) {
    const [local, rest] = splitProps(props, ["class", "open", "onClose", "children"]);

    let dialog: HTMLDialogElement | undefined;

    const classes = () => ["iai-modal", local.class ?? ""].filter(Boolean).join(" ");

    createEffect(() => {
        const el = dialog;
        if (!el) return;
        const isOpen = local.open;
        void import("@i-dot-ai-npm/component-library-frontend").then(
            ({ initModal, openModal, closeModal }) => {
                if (dialog !== el) return;
                initModal(el);
                if (isOpen) openModal(el);
                else closeModal(el);
            },
        );
    });

    const bind = (el: HTMLDialogElement) => {
        dialog = el;
        const handler = () => local.onClose?.();
        el.addEventListener("close", handler);
        onCleanup(() => el.removeEventListener("close", handler));
    };

    return (
        <dialog
            ref={bind}
            class={classes()}
            tabindex="-1"
            data-module="iai-modal"
            {...rest}
        >
            <div class="iai-modal__container">{local.children}</div>
        </dialog>
    );
}
