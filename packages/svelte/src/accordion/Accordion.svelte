<script lang="ts">
    import { onMount } from "svelte";
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLDivElement> & {
        class?: string;
        children?: Snippet;
    };

    let node: HTMLDivElement;
    onMount(() => {
        // Dynamic import keeps govuk-frontend out of SSR.
        void import("govuk-frontend").then(({ Accordion }) => {
            if (!node) return;
            if (node.hasAttribute(`data-${Accordion.moduleName}-init`)) return;
            new Accordion(node);
        });
    });
    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-accordion", className].filter(Boolean).join(" "));
</script>

<div class={classes} data-module="govuk-accordion" bind:this={node} {...rest}>
    {@render children?.()}
</div>
