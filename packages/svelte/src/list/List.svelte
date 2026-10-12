<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLOlAttributes, HTMLAttributes } from "svelte/elements";

    type Props = HTMLOlAttributes & HTMLAttributes<HTMLUListElement> & {
        spaced?: boolean;
        numbered?: string;
        class?: string;
        children?: Snippet;
    };

    let { spaced = false, numbered, class: className = "", children, ...rest }: Props = $props();
</script>

{#if numbered}
<ol class={["govuk-list govuk-list--number", spaced ? "govuk-list--spaced" : "", className].filter(Boolean).join(" ")} {...rest}>
    {@render children?.()}
</ol>
{:else}
<ul class={["govuk-list", spaced ? "govuk-list--spaced" : "", className].filter(Boolean).join(" ")} {...rest}>
    {@render children?.()}
</ul>
{/if}
