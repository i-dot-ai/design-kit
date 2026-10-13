<script>
    import { Feedback } from "@i-dot-ai-npm/component-library-svelte";

    let { classes, titleText, titleHtml, text, html } = $props();
</script>

<Feedback title={titleHtml ?? titleText} class={classes}>
    {#if html}{@html html}{:else}{text}{/if}
</Feedback>
