<script>
    import {
        CookieBanner,
        CookieBannerMessage,
        CookieBannerHeading,
        CookieBannerContent,
        CookieBannerActions,
        Button,
    } from "@i-dot-ai-npm/component-library-svelte";

    let { messages } = $props();
</script>

<CookieBanner>
    {#each messages as message}
        <CookieBannerMessage role={message.role}>
            <div class="govuk-grid-row">
                <div class="govuk-grid-column-two-thirds">
                    {#if message.headingHtml !== undefined}
                        <CookieBannerHeading>{@html message.headingHtml}</CookieBannerHeading>
                    {:else if message.headingText !== undefined}
                        <CookieBannerHeading>{message.headingText}</CookieBannerHeading>
                    {/if}
                    <CookieBannerContent>
                        {#if message.html !== undefined}{@html message.html}{:else}<p class="govuk-body">{message.text}</p>{/if}
                    </CookieBannerContent>
                </div>
            </div>
            {#if message.actions.length > 0}
                <CookieBannerActions>
                    {#each message.actions as action}
                        {#if action.href !== undefined}
                            <a class="govuk-link" href={action.href}>{action.text}</a>
                        {:else}
                            <Button type={action.type} name={action.name} value={action.value}>{action.text}</Button>
                        {/if}
                    {/each}
                </CookieBannerActions>
            {/if}
        </CookieBannerMessage>
    {/each}
</CookieBanner>
