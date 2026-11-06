import { reduce, type Shape } from "../matches-govuk-helpers/reduce";
import { normalise } from "../matches-govuk-helpers/normalise";

export function renderedShape(html: string): Shape {
    return normalise(reduce(html));
}

export type HostOptions = {
    /** Attributes that are the component's own API, kept on the host element. */
    hostAttrs?: string[];
    /** Classes of elements the behaviour layer adds at runtime (for example a chart's canvas). */
    ignoreAdded?: string[];
    ignoreAddedAttrs?: string[];
};

function dropAdded(shape: Shape, ignoreAdded: string[], ignoreAddedAttrs: string[]): Shape {
    return {
        ...shape,
        children: shape.children
            .filter((child) => !child.classes.some((c) => ignoreAdded.includes(c)))
            .map((child) => ({
                ...dropAdded(child, ignoreAdded, ignoreAddedAttrs),
                attrs: Object.fromEntries(Object.entries(child.attrs).filter(([name]) => !ignoreAddedAttrs.includes(name))),
            })),
    };
}

/**
 * Shape of rendered HTML, ignoring the outer (host) element's tag.
 *
 * For web components that stay on the page as their `iai-*` tag (so they can
 * react to changes) instead of replacing themselves: `<iai-chart variant="pie"
 * class="x">` should match an expected `<div class="x">`. Classes, every other
 * attribute and all children are still compared exactly.
 */
export function renderedShapeIgnoringHost(html: string, { hostAttrs = [], ignoreAdded = [], ignoreAddedAttrs = [] }: HostOptions = {}): Omit<Shape, "tag"> {
    const { tag: _tag, attrs, ...rest } = dropAdded(renderedShape(html), ignoreAdded, ignoreAddedAttrs);
    const kept = Object.fromEntries(Object.entries(attrs).filter(([name]) => !hostAttrs.includes(name)));
    return { ...rest, attrs: kept };
}

/**
 * Components whose web component stays on the page as its `iai-*` tag, so it
 * can react to changes, rather than replacing itself with plain HTML. Add a
 * component here to compare its web component examples with
 * `renderedShapeIgnoringHost`.
 */
export const KEEPS_HOST: Record<string, HostOptions> = {
    chart: { hostAttrs: ["id", "variant", "description", "heading-level", "format"], ignoreAdded: ["iai-chart__canvas"], ignoreAddedAttrs: ["id"] },
};
