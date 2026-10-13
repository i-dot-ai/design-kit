<script lang="ts">
    import type { Snippet } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";

    type Props = HTMLAttributes<HTMLElement> & {
        colour?: "grey" | "green" | "teal" | "turquoise" | "blue" | "light-blue" | "purple" | "magenta" | "pink" | "red" | "orange" | "yellow";
        class?: string;
        children?: Snippet;
    };

    let { colour, class: className = "", children, ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-tag",
            (colour ? { "grey": "govuk-tag--grey", "green": "govuk-tag--green", "teal": "govuk-tag--teal", "turquoise": "govuk-tag--turquoise", "blue": "govuk-tag--blue", "light-blue": "govuk-tag--light-blue", "purple": "govuk-tag--purple", "magenta": "govuk-tag--magenta", "pink": "govuk-tag--pink", "red": "govuk-tag--red", "orange": "govuk-tag--orange", "yellow": "govuk-tag--yellow" }[colour] : ""),
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<strong class={classes} {...rest}>
    {@render children?.()}
</strong>
