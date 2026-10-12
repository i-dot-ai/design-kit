<script>
    import { GovukFooter } from "@i-dot-ai-npm/component-library-svelte";

    let { navigation, meta, contentLicence, copyright } = $props();
</script>

<GovukFooter {navigation} {meta} {contentLicence} {copyright} />
