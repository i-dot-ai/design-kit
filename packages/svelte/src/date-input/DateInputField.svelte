<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";

    type Props = HTMLInputAttributes & {
        width?: 2 | 3 | 4;
        class?: string;
    };

    let { width, class: className = "", ...rest }: Props = $props();

    let classes = $derived(
        [
            "govuk-input govuk-date-input__input",
            (width ? {
                2: "govuk-input--width-2",
                3: "govuk-input--width-3",
                4: "govuk-input--width-4",
            }[width] : ""),
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<input class={classes} type="text" inputmode="numeric" {...rest} />
