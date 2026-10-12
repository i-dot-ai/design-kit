import type { ReactNode } from "react";
import {
    Accordion,
    AccordionSection,
    AccordionSectionHeader,
    AccordionSectionHeading,
    AccordionSectionSummary,
    AccordionSectionContent,
} from "@i-dot-ai-npm/component-library-react";
import type { AccordionData } from "../match-govuk-mappings.js";
import { content, summaryHtml } from "../content/govuk-matched-content.react.jsx";

export function renderAccordion(data: AccordionData): ReactNode {
    return (
        <Accordion id={data.id}>
            {data.sections.map((section, i) => (
                <AccordionSection
                    key={i}
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
