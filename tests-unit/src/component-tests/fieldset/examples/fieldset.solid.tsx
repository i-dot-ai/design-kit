/** @jsxImportSource solid-js */
import type { JSX } from "solid-js";
import { Fieldset, FieldsetLegend } from "@i-dot-ai-npm/component-library-solid";
import type { FieldsetData } from "../match-govuk-mappings.js";

export function renderFieldset(data: FieldsetData): JSX.Element {
    return (
        <Fieldset>
            <FieldsetLegend size={data.size} isPageHeading={data.isPageHeading}>
                {data.legendText}
            </FieldsetLegend>
        </Fieldset>
    );
}
