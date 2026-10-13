<script>
    import { Fieldset, FieldsetLegend } from "@i-dot-ai-npm/component-library-svelte";

    let { size, isPageHeading, legendText } = $props();
</script>

<Fieldset>
    <FieldsetLegend {size} {isPageHeading}>{legendText}</FieldsetLegend>
</Fieldset>
