import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { CHART_PAGES, waitForChart } from "./chart-pages";

for (const pageToTest of CHART_PAGES) {
    test(`a11y: ${pageToTest.name} chart has no violations`, async ({ page }) => {
        await page.goto(pageToTest.path);
        await waitForChart(page);

        const results = await new AxeBuilder({ page })
            .disableRules(["page-has-heading-one"])
            .analyze();

        expect(results.violations).toEqual([]);
    });
}
