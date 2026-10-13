import type { GovukFixture } from "./oracle.js";

export type RenderInput = {
    props: Record<string, unknown>;
    text: string;
};

export type ComponentMapping = {
    passthrough?: string[];
    defaultText?: string;
    /**
     * Option keys that supply the component's text child, tried in order.
     * Defaults to `["text", "html"]` (govuk's usual convention). Override for
     * components whose macro names the content differently (e.g. generic-header
     * uses `logoText` / `logoHtml`).
     */
    textFrom?: string[];
    classesToProps?: (classes: string) => Record<string, unknown>;
    transform?: (
        options: Record<string, unknown>,
        props: Record<string, unknown>,
    ) => void;
};

const DEFAULT_PASSTHROUGH = ["id", "name", "type", "value", "href"];

export function mapOptions(
    fixture: GovukFixture,
    mapping: ComponentMapping = {},
): RenderInput {
    const options = fixture.options as Record<string, unknown>;
    const props: Record<string, unknown> = {};

    if (mapping.classesToProps && typeof options.classes === "string") {
        Object.assign(props, mapping.classesToProps(options.classes));
    }

    const passthrough = [...DEFAULT_PASSTHROUGH, ...(mapping.passthrough ?? [])];
    for (const key of passthrough) {
        if (options[key] !== undefined) props[key] = options[key];
    }

    if (options.attributes && typeof options.attributes === "object") {
        Object.assign(props, options.attributes as Record<string, unknown>);
    }

    mapping.transform?.(options, props);

    const textKeys = mapping.textFrom ?? ["text", "html"];
    let text = mapping.defaultText ?? "";
    for (const key of textKeys) {
        if (typeof options[key] === "string") {
            text = options[key] as string;
            break;
        }
    }

    return { props, text };
}
