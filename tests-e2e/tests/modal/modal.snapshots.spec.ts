import { test, expect } from "@playwright/test";
import { MODAL_PAGES, openModal } from "./modal-pages";

for (const pageToTest of MODAL_PAGES) {
    test(`visual regression: ${pageToTest.name} matches previous snapshot`, async ({ page }) => {
        await page.goto(pageToTest.path);

        await openModal(page)
        // ratio difference between linux in CI and darwin in mac
        await expect(page).toHaveScreenshot('modal.png', { animations: "disabled", maxDiffPixelRatio: 0.01 });
    });
}
