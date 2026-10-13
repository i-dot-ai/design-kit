/** @jsxImportSource solid-js */
import { Modal, ModalTitle, ModalBody, ModalFooter } from "@i-dot-ai-npm/component-library-solid";

export function ExampleModal() {
    return (
        <Modal>
            <ModalTitle>Delete item</ModalTitle>
            <ModalBody>Are you sure?</ModalBody>
            <ModalFooter>
                <button type="button" class="govuk-button" data-iai-modal-close="">
                    Confirm
                </button>
            </ModalFooter>
        </Modal>
    );
}
