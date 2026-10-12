<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLDialogAttributes } from "svelte/elements";

    type Props = Omit<HTMLDialogAttributes, "onclose"> & {
        class?: string;
        /** Controls whether the modal is open. */
        open?: boolean;
        /**
         * Called when the modal requests to close (Esc, backdrop click, or a
         * `[data-iai-modal-close]` button). Update your `open` state here.
         */
        onClose?: () => void;
        children?: Snippet;
    };

    let { class: className = "", open = false, onClose, children, ...rest }: Props = $props();

    let dialog = $state<HTMLDialogElement>();

    let classes = $derived(["iai-modal", className].filter(Boolean).join(" "));

    $effect(() => {
        const el = dialog;
        if (!el) return;
        const isOpen = open;
        void import("@i-dot-ai-npm/component-library-frontend").then(
            ({ initModal, openModal, closeModal }) => {
                if (dialog !== el) return;
                initModal(el);
                if (isOpen) openModal(el);
                else closeModal(el);
            },
        );
    });
</script>

<dialog
    bind:this={dialog}
    class={classes}
    tabindex="-1"
    data-module="iai-modal"
    onclose={() => onClose?.()}
    {...rest}
>
    <div class="iai-modal__container">
        {@render children?.()}
    </div>
</dialog>
