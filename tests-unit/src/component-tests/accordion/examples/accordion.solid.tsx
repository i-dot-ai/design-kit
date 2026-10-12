/** @jsxImportSource solid-js */
import type { JSX } from "solid-js";
import {
    Accordion,
    AccordionSection,
    AccordionSectionHeader,
    AccordionSectionHeading,
    AccordionSectionSummary,
    AccordionSectionContent,
} from "@i-dot-ai-npm/component-library-solid";
import type { AccordionData } from "../match-govuk-mappings.js";
import { content, summaryHtml } from "../content/govuk-matched-content.solid.jsx";

export function renderAccordion(data: AccordionData): JSX.Element {
    return (
        <Accordion id={data.id}>
            {data.sections.map((section, i) => (
                <AccordionSection
                    class={section.expanded ? "govuk-accordion__section--expanded" : undefined}
                >
                    <AccordionSectionHeader>
                        <AccordionSectionHeading id={section.headingId}>
                            {section.heading}
                        </AccordionSectionHeading>
                        {section.summaryId && (
                            <AccordionSectionSummary id={section.summaryId}>
                                {section.summaryHtml
                                    ? summaryHtml[data.name]?.[i]
                                    : section.summaryText}
                            </AccordionSectionSummary>
                        )}
                    </AccordionSectionHeader>
                    <AccordionSectionContent id={section.contentId}>
                        {content[data.name][i]}
                    </AccordionSectionContent>
                </AccordionSection>
            ))}
        </Accordion>
    );
}
