import { test, expect } from "@playwright/test";
import { AVATAR_PAGES } from "./avatar-pages";

for (const pageToTest of AVATAR_PAGES) {
    test(`visual regression: ${pageToTest.name} avatar matches previous snapshot`, async ({ page }) => {
        await page.goto(pageToTest.path);

        // ratio difference between linux in CI and darwin in mac
        await expect(page.locator(pageToTest.component)).toHaveScreenshot(`${pageToTest.name}.png`, {
            animations: "disabled",
            maxDiffPixelRatio: 0.02,
        });
    });
}
