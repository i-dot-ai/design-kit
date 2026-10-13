import type { ReactNode } from "react";
import { Fieldset, FieldsetLegend } from "@i-dot-ai-npm/component-library-react";
import type { FieldsetData } from "../match-govuk-mappings.js";

export function renderFieldset(data: FieldsetData): ReactNode {
    return (
        <Fieldset>
            <FieldsetLegend size={data.size} isPageHeading={data.isPageHeading}>
                {data.legendText}
            </FieldsetLegend>
        </Fieldset>
    );
}
