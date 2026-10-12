<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & HTMLAttributes<HTMLUListElement> & {
        single?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { single = false, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-summary-card__actions", className].filter(Boolean).join(" "));
</script>

{#if single}
    <div class={classes} {...rest}>
        {@render children?.()}
    </div>
{:else}
    <ul class={classes} {...rest}>
        {@render children?.()}
    </ul>
{/if}
