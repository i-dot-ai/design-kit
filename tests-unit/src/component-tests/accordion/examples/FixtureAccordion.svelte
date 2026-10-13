<script>
    import {
        Accordion,
        AccordionSection,
        AccordionSectionHeader,
        AccordionSectionHeading,
        AccordionSectionSummary,
        AccordionSectionContent,
    } from "@i-dot-ai-npm/component-library-svelte";

    let { id, sections } = $props();
</script>

<Accordion {id}>
    {#each sections as section (section.headingId)}
        <AccordionSection
            class={section.expanded ? "govuk-accordion__section--expanded" : ""}
        >
            <AccordionSectionHeader>
                <AccordionSectionHeading id={section.headingId}>
                    {section.heading}
                </AccordionSectionHeading>
                {#if section.summaryId}
                    <AccordionSectionSummary id={section.summaryId}>
                        {#if section.summaryHtml}{@html section.summaryHtml}{:else}{section.summaryText}{/if}
                    </AccordionSectionSummary>
                {/if}
            </AccordionSectionHeader>
            <AccordionSectionContent id={section.contentId}>
                {#if section.contentHtml}{@html section.contentHtml}{:else}<p class="govuk-body">{section.contentText}</p>{/if}
            </AccordionSectionContent>
        </AccordionSection>
    {/each}
</Accordion>
