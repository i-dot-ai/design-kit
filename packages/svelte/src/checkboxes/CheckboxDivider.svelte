<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        class?: string;
        children?: Snippet;
    };

    let { class: className = "", children }: Props = $props();

    let classes = $derived(["govuk-checkboxes__divider", className].filter(Boolean).join(" "));
</script>

<div class={classes}>
    {#if children}{@render children()}{:else}or{/if}
</div>
