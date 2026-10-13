<script>
    import { Breadcrumbs, BreadcrumbItem } from "@i-dot-ai-npm/component-library-svelte";

    let { inverse, collapseOnMobile, items } = $props();
</script>

<Breadcrumbs {inverse} {collapseOnMobile}>
    {#each items as item}
        <BreadcrumbItem href={item.href}>{item.text}</BreadcrumbItem>
    {/each}
</Breadcrumbs>
