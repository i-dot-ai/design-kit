import { test, expect } from "@playwright/test";
import { CHART_PAGES, waitForChart } from "./chart-pages";

for (const pageToTest of CHART_PAGES) {
    test(`visual regression: ${pageToTest.name} matches previous snapshot`, async ({ page }) => {
        await page.goto(pageToTest.path);
        await waitForChart(page);
        await page.evaluate(() => document.fonts.ready);
        // Skip the chart's draw-in animation so the snapshot is the finished chart.
        await page.locator(".iai-chart").evaluate((el) =>
            (el as HTMLElement & { iaiChart: { update: (mode: string) => void } }).iaiChart.update("none"),
        );

        const variant = pageToTest.variant;
        // Same image name for every framework, so each must look like the HTML version.
        // ratio difference between linux in CI and darwin in mac
        await expect(page.locator(".iai-chart")).toHaveScreenshot(`chart-${variant}.png`, {
            animations: "disabled",
            maxDiffPixelRatio: 0.01,
        });
    });
}
