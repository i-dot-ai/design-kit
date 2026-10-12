<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { onMount } from "svelte";

    type Props = HTMLAttributes<HTMLDivElement> & {
        class?: string;
        children?: Snippet;
    };

    let node: HTMLDivElement | undefined = $state();
    onMount(() => {
        // Dynamic import keeps govuk-frontend out of SSR.
        void import("govuk-frontend").then(({ Tabs }) => {
            if (!node) return;
            if (node.hasAttribute(`data-${Tabs.moduleName}-init`)) return;
            new Tabs(node);
        });
    });
    let { class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(["govuk-tabs", className].filter(Boolean).join(" "));
</script>

<div class={classes} data-module="govuk-tabs" bind:this={node} {...rest}>
    {@render children?.()}
</div>
