import { expect, type Page } from "@playwright/test";

/** The chart gallery pages. Only plain HTML exists so far. */
export const CHART_PAGES = [{ name: "html", path: "/test/chart/line/html" }];

export async function waitForChart(page: Page) {
    await expect(page.locator(".iai-chart canvas")).toBeVisible();
}
