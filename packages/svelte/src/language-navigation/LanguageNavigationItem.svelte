<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAnchorAttributes, HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLSpanElement> & HTMLAnchorAttributes & {
        href?: string;
        current?: boolean;
        lang?: string;
        dir?: "ltr" | "rtl" | "auto" | null | undefined;
        hreflang?: string;
        languageDescriptionText?: string;
        children?: Snippet;
    };

    let {
        href,
        current = false,
        lang,
        dir,
        hreflang,
        languageDescriptionText,
        children,
        ...rest
    }: Props = $props();
</script>

<li class="govuk-language-navigation__list-item">
    {#if current}
        <span class="govuk-language-navigation__text" aria-current="true" {lang} {dir} {...rest}>
            {@render children?.()}
        </span>
    {:else}
        <a
            class="govuk-language-navigation__link"
            {href}
            rel="alternate"
            {lang}
            hreflang={hreflang ?? lang}
            {dir}
            {...rest}
        >
            {@render children?.()}{#if languageDescriptionText}<span class="govuk-visually-hidden"> {languageDescriptionText}</span>{/if}
        </a>
    {/if}
</li>
