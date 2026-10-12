/** @jsxImportSource solid-js */
import { createSignal } from "solid-js";
import {
    Button,
    Modal,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@i-dot-ai-npm/component-library-solid";

export default function SolidModal() {
    const [open, setOpen] = createSignal(false);

    return (
        <>
            <Button type="button" data-testid="open" onClick={() => setOpen(true)}>
                Open modal
            </Button>

            <Modal
                open={open()}
                onClose={() => setOpen(false)}
                aria-labelledby="solid-modal-title"
                data-testid="modal">
                <ModalTitle id="solid-modal-title">Delete item</ModalTitle>
                <ModalBody>
                    <p class="govuk-body">Are you sure you want to delete this item?</p>
                </ModalBody>
                <ModalFooter>
                    <Button type="button" warning data-testid="confirm" onClick={() => setOpen(false)}>
                        Delete
                    </Button>
                    <Button type="button" secondary data-testid="cancel" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
}
