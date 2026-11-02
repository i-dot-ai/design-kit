import { test, expect } from "@playwright/test";
import { CHART_PAGES, waitForChart } from "./chart-pages";

for (const target of CHART_PAGES) {
    test.describe(`behaviour: ${target.name}`, () => {
        test("draws a labelled canvas from the table", async ({ page }) => {
            await page.goto(target.path);
            await waitForChart(page);
            const canvas = page.locator(".iai-chart canvas");
            await expect(canvas).toHaveAttribute("role", "img");
            await expect(canvas).toHaveAccessibleName("Requests per hour");
        });

        test("reads the series, colours and gaps from the table", async ({ page }) => {
            await page.goto(target.path);
            await waitForChart(page);
            const datasets = await page.locator(".iai-chart").evaluate((el) =>
                (el as HTMLElement & { iaiChart: { data: { labels: string[]; datasets: { label: string; data: (number | null)[]; borderColor: string; borderDash?: number[] }[] } } })
                    .iaiChart.data,
            );
            expect(datasets.labels).toEqual(["09:00", "10:00", "11:00", "12:00"]);
            expect(datasets.datasets.map((d) => d.label)).toEqual(["Requests", "Errors"]);
            expect(datasets.datasets[0].data).toEqual([1240, 1875.5, 2310, 1980]);
            expect(datasets.datasets[1].data).toEqual([12, 18, null, 9]);
            expect(datasets.datasets[0].borderColor).toBe("#0f385c");
            expect(datasets.datasets[1].borderColor).toBe("#ca357c");
            expect(datasets.datasets[0].borderDash).toBeUndefined();
            expect(datasets.datasets[1].borderDash?.length).toBeGreaterThan(0);
        });

        test("the data table stays available behind Show data", async ({ page }) => {
            await page.goto(target.path);
            await waitForChart(page);
            await expect(page.locator(".iai-chart table")).toBeHidden();
            await page.getByText("Show data").click();
            await expect(page.locator(".iai-chart table")).toBeVisible();
        });
    });
}

test("without JavaScript the table is still there and no canvas is drawn", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto(CHART_PAGES[0].path);
    await expect(page.locator(".iai-chart canvas")).toHaveCount(0);
    await page.getByText("Show data").click();
    await expect(page.locator(".iai-chart table")).toBeVisible();
    await context.close();
});
