import { expect } from "vitest";
import { reduce } from "../matches-govuk-helpers/reduce";

export type IaiVariant = {
    name: string;
    props: Record<string, unknown>;
    expectClass: string;
};

export function expectVariantClass(html: string, variant: IaiVariant): void {
    const { classes } = reduce(html);
    expect(classes).toContain(variant.expectClass);
}
