<script>
    import {
        Tabs,
        TabsTitle,
        TabsList,
        Tab,
        TabPanel,
    } from "@i-dot-ai-npm/component-library-svelte";

    let { title, items } = $props();
</script>

<Tabs>
    <TabsTitle>{title}</TabsTitle>
    <TabsList>
        {#each items as item}
            <Tab href={`#${item.id}`} selected={item.selected}>{item.label}</Tab>
        {/each}
    </TabsList>
    {#each items as item}
        <TabPanel id={item.id} hidden={!item.selected}>
            {#if item.panelHtml}{@html item.panelHtml}{:else}<p class="govuk-body">{item.panelText}</p>{/if}
        </TabPanel>
    {/each}
</Tabs>
