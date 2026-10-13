import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type PanelAction = {
    text: string;
    href?: string;
    type?: string;
    attributes?: Record<string, string>;
};

export type PanelData = {
    name: string;
    classes?: string;
    titleText?: string;
    titleHtml?: string;
    text?: string;
    html?: string;
    isInterruption: boolean;
    // Whether govuk renders the __actions container at all (params.actions truthy).
    hasActions: boolean;
    // The action items govuk actually renders (only from actions.items, matching
    // the template — a bare `actions` array has no `.items`, so renders nothing).
    actions: PanelAction[];
    expectedHtml: string;
};

type PanelOptions = {
    classes?: string;
    titleText?: string;
    titleHtml?: string;
    text?: string;
    html?: string;
    // govuk fixtures give actions either as { items: [...] } or a bare array.
    // The template only reads `actions.items`, so a bare array renders no items.
    actions?: { items?: PanelAction[] } | PanelAction[];
};

/** Every non-hidden panel fixture, as structured data. */
export function panelFixtures(): PanelData[] {
    return loadFixtures("panel").map((fixture) => {
        const options = fixture.options as PanelOptions;
        const isInterruption = (options.classes ?? "").includes("govuk-panel--interruption");
        const items =
            options.actions && !Array.isArray(options.actions)
                ? options.actions.items ?? []
                : [];
        return {
            name: fixture.name,
            classes: options.classes,
            titleText: options.titleText,
            titleHtml: options.titleHtml,
            text: options.text,
            html: options.html,
            isInterruption,
            hasActions: isInterruption && options.actions != null,
            actions: isInterruption ? items : [],
            expectedHtml: fixture.html,
        };
    });
}
