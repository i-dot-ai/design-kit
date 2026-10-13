<script>
    import { Modal, ModalTitle, ModalBody, ModalFooter } from "@i-dot-ai-npm/component-library-svelte";
</script>

<Modal>
    <ModalTitle>Delete item</ModalTitle>
    <ModalBody>Are you sure?</ModalBody>
    <ModalFooter>
        <button type="button" class="govuk-button" data-iai-modal-close="">Confirm</button>
    </ModalFooter>
</Modal>
