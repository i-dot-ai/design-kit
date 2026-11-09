import { expect, type Page } from "@playwright/test";

const VARIANTS = [
    { variant: "line", type: "line", title: "Applications received by month" },
    { variant: "bar", type: "bar", title: "Applications received by region" },
    { variant: "horizontal-bar", type: "bar", title: "Applications received by region in 2026" },
    { variant: "pie", type: "pie", title: "How applications were submitted" },
    { variant: "doughnut", type: "doughnut", title: "Application outcomes" },
    { variant: "area", type: "line", title: "Applications by channel" },
];

const FRAMEWORKS = ["html", "react", "solid", "svelte"];

/** Every chart page: one per variant per framework. */
export const CHART_PAGES = FRAMEWORKS.flatMap((framework) =>
    VARIANTS.map((v) => ({ ...v, framework, name: `${framework} ${v.variant}`, path: `/test/chart/${v.variant}/${framework}` })),
);

export const pagesFor = (variant: string) => CHART_PAGES.filter((p) => p.variant === variant);

export async function waitForChart(page: Page) {
    await expect(page.locator(".iai-chart canvas")).toBeVisible();
}

type ChartData = {
    labels: string[];
    datasets: { label: string; data: (number | null)[]; borderColor: string | string[]; backgroundColor: string | string[]; borderDash?: number[]; fill?: string | boolean }[];
};

export async function readChart(page: Page) {
    return page.locator(".iai-chart").evaluate((el) => {
        const chart = (el as HTMLElement & { iaiChart: { config: { type: string }; data: ChartData; scales: Record<string, unknown> } }).iaiChart;
        return { type: chart.config.type, data: chart.data, scales: Object.keys(chart.scales) };
    });
}
