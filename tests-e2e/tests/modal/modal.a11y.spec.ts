import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { MODAL_PAGES, openModal } from "./modal-pages";

// Open the modal first, since violations only surface while it is rendered.
for (const pageToTest of MODAL_PAGES) {
    test(`a11y: ${pageToTest.name} modal has no violations when open`, async ({ page }) => {
        await page.goto(pageToTest.path);

        openModal(page)

        const results = await new AxeBuilder({ page })
            // color-contrast gives false positives through the ::backdrop top layer
            .disableRules(["color-contrast", "page-has-heading-one"])
            .analyze();

        expect(results.violations).toEqual([]);
    });
}
