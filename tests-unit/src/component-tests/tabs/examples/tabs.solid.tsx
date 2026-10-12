/** @jsxImportSource solid-js */
import type { JSX } from "solid-js";
import {
    Tabs,
    TabsTitle,
    TabsList,
    Tab,
    TabPanel,
} from "@i-dot-ai-npm/component-library-solid";
import type { TabsData } from "../match-govuk-mappings.js";
import { panelContent } from "../content/govuk-matched-content.solid.jsx";

export function renderTabs(data: TabsData): JSX.Element {
    return (
        <Tabs>
            <TabsTitle>{data.title}</TabsTitle>
            <TabsList>
                {data.items.map((item) => (
                    <Tab href={`#${item.id}`} selected={item.selected}>
                        {item.label}
                    </Tab>
                ))}
            </TabsList>
            {data.items.map((item, i) => (
                <TabPanel id={item.id} hidden={!item.selected}>
                    {panelContent[data.name][i]}
                </TabPanel>
            ))}
        </Tabs>
    );
}
