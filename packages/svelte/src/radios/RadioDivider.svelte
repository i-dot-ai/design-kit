<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children }: Props = $props();

    let classes = $derived(["govuk-radios__divider", className].filter(Boolean).join(" "));
</script>

<div class={classes}>
    {#if children}{@render children()}{:else}or{/if}
</div>
