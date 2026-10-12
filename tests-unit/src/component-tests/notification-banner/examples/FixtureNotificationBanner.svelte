<script>
    import {
        NotificationBanner,
        NotificationBannerHeader,
        NotificationBannerTitle,
        NotificationBannerContent,
        NotificationBannerHeading,
    } from "@i-dot-ai-npm/component-library-svelte";

    let { success, titleText, text, html } = $props();
</script>

<NotificationBanner success={success ? "true" : undefined}>
    <NotificationBannerHeader>
        <NotificationBannerTitle>{titleText}</NotificationBannerTitle>
    </NotificationBannerHeader>
    <NotificationBannerContent>
        {#if html !== undefined}
            {@html html}
        {:else}
            <NotificationBannerHeading>{text}</NotificationBannerHeading>
        {/if}
    </NotificationBannerContent>
</NotificationBanner>
