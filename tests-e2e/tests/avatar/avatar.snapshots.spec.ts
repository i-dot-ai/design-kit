import { test, expect } from "@playwright/test";
import { AVATAR_PAGES } from "./avatar-pages";

for (const pageToTest of AVATAR_PAGES) {
    test(`visual regression: ${pageToTest.name} avatar matches previous snapshot`, async ({ page, browserName }) => {
        test.skip(browserName === "firefox" && pageToTest.name === "inverse", "Firefox difference in CI vs Mac was image size, skipping rather than large workaround");

        await page.goto(pageToTest.path);

        // splitting snapshots to just around the avatar and the body to stop seeing the whole width of the page
        for (const [index, component] of (await page.locator('.iai-avatar').all()).entries())
            await expect(component).toHaveScreenshot(`${pageToTest.name}-icon-${index}.png`, {
                animations: "disabled",
                // ratio difference between linux in CI and darwin in mac
                maxDiffPixelRatio: 0.04,
            });

        if (pageToTest.iconOnly) return

        await expect(page.locator('.govuk-body')).toHaveScreenshot(`${pageToTest.name}-name.png`, {
            animations: "disabled",
            // ratio difference between linux in CI and darwin in mac
            maxDiffPixelRatio: 0.12,
        });
    });
}
