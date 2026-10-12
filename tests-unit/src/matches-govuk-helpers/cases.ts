import { reduce, type Shape } from "./reduce.js";
import { normalise } from "./normalise.js";
import { loadFixtures } from "./oracle.js";
import { mapOptions, type ComponentMapping, type RenderInput } from "./mapping.js";

export type ComponentCase = {
    name: string;
    input: RenderInput;
    expected: Shape;
};

export type CasesOptions = {
    skipHtmlContent?: boolean;
};

export function casesFor(
    component: string,
    mapping: ComponentMapping = {},
    options: CasesOptions = {},
): ComponentCase[] {
    return loadFixtures(component)
        .filter((fixture) =>
            options.skipHtmlContent
                ? (fixture.options as { html?: unknown }).html === undefined
                : true,
        )
        .map((fixture) => ({
            name: fixture.name,
            input: mapOptions(fixture, mapping),
            expected: normalise(reduce(fixture.html)),
        }));
}

export function toShape(html: string): Shape {
    return normalise(reduce(html));
}
