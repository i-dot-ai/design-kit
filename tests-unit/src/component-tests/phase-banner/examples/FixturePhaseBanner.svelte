<script>
    import { PhaseBanner, PhaseBannerText, Tag } from "@i-dot-ai-npm/component-library-svelte";

    let { tagText, tagHtml, bodyText, bodyHtml } = $props();
</script>

<PhaseBanner>
    <Tag class="govuk-phase-banner__content__tag">
        {#if tagHtml}{@html tagHtml}{:else}{tagText}{/if}
    </Tag>
    <PhaseBannerText>
        {#if bodyHtml}{@html bodyHtml}{:else}{bodyText}{/if}
    </PhaseBannerText>
</PhaseBanner>
