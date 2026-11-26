import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { AVATAR_PAGES } from "./avatar-pages";

for (const pageToTest of AVATAR_PAGES) {
    test(`a11y: ${pageToTest.name} avatar has no violations`, async ({ page }) => {
        await page.goto(pageToTest.path);

        const results = await new AxeBuilder({ page })
            // page-has-heading-one: the gallery layout has no h1 by design
            .disableRules(["page-has-heading-one"])
            .analyze();

        expect(results.violations).toEqual([]);
    });
}
