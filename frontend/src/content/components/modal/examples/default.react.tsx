import { useState } from "react";
import {
    Button,
    Modal,
    ModalTitle,
    ModalBody,
    ModalFooter,
} from "@i-dot-ai-npm/component-library-react";

export default function ReactModal() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button type="button" data-testid="open" onClick={() => setOpen(true)}>
                Open modal
            </Button>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="react-modal-title"
                data-testid="modal">
                <ModalTitle id="react-modal-title">Delete item</ModalTitle>
                <ModalBody>
                    <p className="govuk-body">Are you sure you want to delete this item?</p>
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
