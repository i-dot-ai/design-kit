<script lang="ts">
    import {
        Button,
        Modal,
        ModalTitle,
        ModalBody,
        ModalFooter,
    } from "@i-dot-ai-npm/component-library-svelte";

    let open = $state(false);
</script>

<Button type="button" data-testid="open" onclick={() => (open = true)}>
    Open modal
</Button>

<Modal
    {open}
    onClose={() => (open = false)}
    aria-labelledby="svelte-modal-title"
    data-testid="modal"
>
    <ModalTitle id="svelte-modal-title">Delete item</ModalTitle>
    <ModalBody>
        <p class="govuk-body">Are you sure you want to delete this item?</p>
    </ModalBody>
    <ModalFooter>
        <Button type="button" warning data-testid="confirm" onclick={() => (open = false)}>
            Delete
        </Button>
        <Button type="button" secondary data-testid="cancel" onclick={() => (open = false)}>
            Cancel
        </Button>
    </ModalFooter>
</Modal>
