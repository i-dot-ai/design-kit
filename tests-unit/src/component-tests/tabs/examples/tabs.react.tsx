import type { ReactNode } from "react";
import {
    Tabs,
    TabsTitle,
    TabsList,
    Tab,
    TabPanel,
} from "@i-dot-ai-npm/component-library-react";
import type { TabsData } from "../match-govuk-mappings.js";
import { panelContent } from "../content/govuk-matched-content.react.jsx";

export function renderTabs(data: TabsData): ReactNode {
    return (
        <Tabs>
            <TabsTitle>{data.title}</TabsTitle>
            <TabsList>
                {data.items.map((item, i) => (
                    <Tab key={i} href={`#${item.id}`} selected={item.selected}>
                        {item.label}
                    </Tab>
                ))}
            </TabsList>
            {data.items.map((item, i) => (
                <TabPanel key={i} id={item.id} hidden={!item.selected}>
                    {panelContent[data.name][i]}
                </TabPanel>
            ))}
        </Tabs>
    );
}
