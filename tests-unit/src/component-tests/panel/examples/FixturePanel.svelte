<script>
    import { Panel, PanelTitle, PanelBody, PanelActions } from "@i-dot-ai-npm/component-library-svelte";

    let { classes, titleText, titleHtml, text, html, hasActions, actions } = $props();
</script>

<Panel class={classes}>
    <PanelTitle>
        {#if titleHtml}{@html titleHtml}{:else}{titleText}{/if}
    </PanelTitle>
    {#if html || text}
        <PanelBody>
            {#if html}{@html html}{:else}{text}{/if}
        </PanelBody>
    {/if}
    {#if hasActions}
        <PanelActions>
            {#if actions.length > 0}
                <div class="govuk-button-group">
                    {#each actions as action}
                        {#if action.href && action.type !== "button"}
                            <a class="govuk-link govuk-link--inverse" href={action.href}>{action.text}</a>
                        {:else}
                            <button type={action.type ?? "button"} class="govuk-button govuk-button--inverse" data-module="govuk-button" {...action.attributes ?? {}}>{action.text}</button>
                        {/if}
                    {/each}
                </div>
            {/if}
        </PanelActions>
    {/if}
</Panel>
