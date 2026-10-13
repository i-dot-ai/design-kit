<script>
    import {
        LanguageNavigation,
        LanguageNavigationItem,
    } from "@i-dot-ai-npm/component-library-svelte";

    let { ariaLabel, classes, attributes, items } = $props();
</script>

<LanguageNavigation {ariaLabel} class={classes} {...attributes ?? {}}>
    {#each items as item}
        <LanguageNavigationItem
            href={item.href}
            current={item.current}
            lang={item.lang}
            dir={item.dir}
            hreflang={item.hreflang}
            languageDescriptionText={item.languageDescriptionText}
        >
            {item.text}
        </LanguageNavigationItem>
    {/each}
</LanguageNavigation>
