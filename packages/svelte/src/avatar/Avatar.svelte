<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLSpanElement> & {
        fullName?: string;
        size?: "small" | "large";
        inverse?: boolean;
        class?: string;
        children?: Snippet;
    };

    let { fullName, size, inverse, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        ["iai-avatar", size ? `iai-avatar--${size}` : "", inverse ? "iai-avatar--inverse" : "", className].filter(Boolean).join(" ")
    );

    let initials = $derived(
        fullName
            ? fullName.split(" ").filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase()
            : ""
    );
</script>

<span class={classes} {...rest}>
    {#if children}
        {@render children()}
    {:else if initials}
        {initials}
    {:else}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
        </svg>
    {/if}
</span>
