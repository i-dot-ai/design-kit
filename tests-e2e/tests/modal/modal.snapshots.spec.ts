import { test, expect } from "@playwright/test";
import { MODAL_PAGES, openModal } from "./modal-pages";

for (const pageToTest of MODAL_PAGES) {
    test(`visual regression: ${pageToTest.name} matches previous snapshot`, async ({ page }) => {
        await page.goto(pageToTest.path);

        await openModal(page)

        await expect(page).toHaveScreenshot('modal.png', { animations: "disabled" });
    });
}
