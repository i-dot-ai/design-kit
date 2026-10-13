<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements";

    type Props = HTMLInputAttributes & {
        error?: boolean;
        extraLetterSpacing?: boolean;
        subtle?: boolean;
        width?: 2 | 3 | 4 | 5 | 10 | 20 | 30;
        class?: string;
    };

    let {
        error = false,
        extraLetterSpacing = false,
        subtle = false,
        width,
        class: className = "",
        ...rest
    }: Props = $props();

    let classes = $derived(
        [
            "govuk-input",
            error ? "govuk-input--error" : "",
            extraLetterSpacing ? "govuk-input--extra-letter-spacing" : "",
            subtle ? "govuk-input--subtle" : "",
            (width ? {
                2: "govuk-input--width-2",
                3: "govuk-input--width-3",
                4: "govuk-input--width-4",
                5: "govuk-input--width-5",
                10: "govuk-input--width-10",
                20: "govuk-input--width-20",
                30: "govuk-input--width-30",
            }[width] : ""),
            className,
        ]
            .filter(Boolean)
            .join(" "),
    );
</script>

<input class={classes} type="text" {...rest} />
