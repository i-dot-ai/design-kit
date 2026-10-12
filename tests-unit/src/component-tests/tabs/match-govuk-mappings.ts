import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type TabItemData = {
    label: string;
    id: string;
    selected: boolean;
    panelHtml?: string;
    panelText?: string;
};

export type TabsData = {
    name: string;
    title: string;
    items: TabItemData[];
    expectedHtml: string;
};

type TabsOptions = {
    title?: string;
    items?: { label: string; id: string; panel: { html?: string; text?: string } }[];
};

/** Every non-hidden tabs fixture, as structured data. */
export function tabsFixtures(): TabsData[] {
    return loadFixtures("tabs").map((fixture) => {
        const options = fixture.options as TabsOptions;
        return {
            name: fixture.name,
            title: options.title ?? "Contents",
            items: (options.items ?? []).map((item, i) => ({
                label: item.label,
                id: item.id,
                selected: i === 0,
                panelHtml: item.panel.html,
                panelText: item.panel.text,
            })),
            expectedHtml: fixture.html,
        };
    });
}
