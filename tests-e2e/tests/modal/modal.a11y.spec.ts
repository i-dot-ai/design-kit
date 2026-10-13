import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { MODAL_PAGES } from "./modal-pages";

// Open the modal first, since violations only surface while it is rendered.
for (const page of MODAL_PAGES) {
    test(`a11y: ${page.name} modal has no violations when open`, async ({ page: pw }) => {
        await pw.goto(page.path);

        await pw.getByTestId("open").click();
        await expect(pw.getByTestId("modal")).toBeVisible();

        const results = await new AxeBuilder({ page: pw })
            // color-contrast gives false positives through the ::backdrop top layer
            .disableRules(["color-contrast"])
            .analyze();

        expect(results.violations).toEqual([]);
    });
}
