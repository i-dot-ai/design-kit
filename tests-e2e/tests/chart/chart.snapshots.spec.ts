import { test, expect } from "@playwright/test";
import { CHART_PAGES, waitForChart } from "./chart-pages";

for (const pageToTest of CHART_PAGES) {
    test(`visual regression: ${pageToTest.name} matches previous snapshot`, async ({ page }) => {
        // Charts skip their draw-in animation for reduced motion, so the snapshot is the finished chart
        // even if the chart is redrawn after it first appears.
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(pageToTest.path);
        await waitForChart(page);
        await page.evaluate(() => document.fonts.ready);

        const variant = pageToTest.variant;
        // Same image name for every framework, so each must look like the HTML version.
        // ratio difference between linux in CI and darwin in mac
        await expect(page.locator(".iai-chart")).toHaveScreenshot(`chart-${variant}.png`, {
            animations: "disabled",
            maxDiffPixelRatio: 0.02,
        });
    });
}
