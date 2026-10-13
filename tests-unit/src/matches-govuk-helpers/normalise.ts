import type { Shape } from "./reduce.js";

/**
 * Attributes that are pure framework/hydration noise and carry no GOV.UK
 * semantic meaning. Stripped before comparison so equivalent output matches.
 *
 * Keep this list small and explicit — the design principle is:
 * "exact on semantic attrs, allowlist noise" (not the other way around).
 */
const NOISE_ATTRS = new Set<string>([
    // Astro island / hydration wrappers
    "astro-island",
    "ssr",
    "uid",
    "component-url",
    "component-export",
    "renderer-url",
    "props",
    "opts",
    "await-children",
    // Solid hydration keys
    "data-hk",
    // Generic hydration/runtime markers
    "data-svelte-h",
]);

/**
 * Canonicalise an inline `style` string so that framework serialisation
 * differences (spacing, trailing semicolons, declaration order) don't cause
 * false mismatches. `"white-space: nowrap;"` and `"white-space:nowrap"` become
 * the same value.
 */
function normaliseStyle(value: string): string {
    return value
        .split(";")
        .map((decl) => decl.trim())
        .filter(Boolean)
        .map((decl) => {
            const [prop, ...rest] = decl.split(":");
            return `${prop.trim()}:${rest.join(":").trim()}`;
        })
        .sort()
        .join(";");
}

function stripNoiseFromShape(shape: Shape): Shape {
    const attrs: Record<string, string> = {};
    for (const [name, value] of Object.entries(shape.attrs)) {
        if (NOISE_ATTRS.has(name)) continue;
        attrs[name] = name === "style" ? normaliseStyle(value) : value;
    }

    return {
        tag: shape.tag,
        classes: shape.classes,
        attrs,
        text: shape.text,
        children: shape.children.map(stripNoiseFromShape),
    };
}

/**
 * Remove framework noise from a reduced shape so that semantically-equivalent
 * output from different frameworks (and from the govuk fixture) compares equal.
 */
export function normalise(shape: Shape): Shape {
    return stripNoiseFromShape(shape);
}
