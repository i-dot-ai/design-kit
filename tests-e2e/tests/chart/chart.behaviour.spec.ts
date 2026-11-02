import { test, expect } from "@playwright/test";
import { CHART_PAGES, pagesFor, readChart, waitForChart } from "./chart-pages";

for (const target of CHART_PAGES) {
    test.describe(`behaviour: ${target.name}`, () => {
        test("draws a labelled canvas of the right type from the table", async ({ page }) => {
            await page.goto(target.path);
            await waitForChart(page);
            const canvas = page.locator(".iai-chart canvas");
            await expect(canvas).toHaveAttribute("role", "img");
            await expect(canvas).toHaveAccessibleName(target.title);
            expect((await readChart(page)).type).toBe(target.type);
        });

        test("the data table stays available behind Show data", async ({ page }) => {
            await page.goto(target.path);
            await waitForChart(page);
            await expect(page.locator(".iai-chart table")).toBeHidden();
            await page.getByText("Show data").click();
            await expect(page.locator(".iai-chart table")).toBeVisible();
        });

        test("without JavaScript the table is still there and no canvas is drawn", async ({ browser }) => {
            test.skip(target.framework === "web-components", "web components need JavaScript to render anything");
            const context = await browser.newContext({ javaScriptEnabled: false });
            const page = await context.newPage();
            await page.goto(target.path);
            await expect(page.locator(".iai-chart canvas")).toHaveCount(0);
            await page.getByText("Show data").click();
            await expect(page.locator(".iai-chart table")).toBeVisible();
            await context.close();
        });
    });
}

for (const target of pagesFor("line")) {
    test(`line: reads the series, colours, line styles and gaps from the table (${target.framework})`, async ({ page }) => {
        await page.goto(target.path);
        await waitForChart(page);
        const { data } = await readChart(page);
        expect(data.labels).toEqual(["January", "February", "March", "April", "May", "June"]);
        expect(data.datasets.map((d) => d.label)).toEqual(["2024", "2025", "2026"]);
        expect(data.datasets[0].data).toEqual([1200, 1350, 1500, 1420, 1600, 1650]);
        expect(data.datasets[2].data).toEqual([1600, 1720, 1880, 1950, 2040, null]);
        expect(data.datasets.map((d) => d.borderColor)).toEqual(["#0f385c", "#1d70b8", "#5694ca"]);
        const [solid, dashed, dotted] = data.datasets.map((d) => d.borderDash);
        expect(solid).toBeUndefined();
        expect(dashed?.length).toBeGreaterThan(0);
        expect(dotted?.length).toBeGreaterThan(0);
        expect(dotted).not.toEqual(dashed);
    });
}

for (const target of pagesFor("bar")) {
    test(`bar: reads the series and colours from the table (${target.framework})`, async ({ page }) => {
        await page.goto(target.path);
        await waitForChart(page);
        const { data } = await readChart(page);
        expect(data.labels).toEqual(["North", "Midlands", "South", "Wales", "Scotland"]);
        expect(data.datasets.map((d) => d.label)).toEqual(["2025", "2026"]);
        expect(data.datasets[0].data).toEqual([2400, 1850, 3100, 950, 1300]);
        expect(data.datasets.map((d) => d.backgroundColor)).toEqual(["#0f385c", "#5694ca"]);
    });
}

for (const target of pagesFor("pie")) {
    test(`pie: colours each slice from its row and draws no axes (${target.framework})`, async ({ page }) => {
        await page.goto(target.path);
        await waitForChart(page);
        const { data, scales } = await readChart(page);
        expect(data.labels).toEqual(["Online", "Phone", "Post", "In person"]);
        expect(data.datasets).toHaveLength(1);
        expect(data.datasets[0].data).toEqual([6200, 1450, 820, 330]);
        expect(data.datasets[0].backgroundColor).toEqual(["#0f385c", "#1d70b8", "#50a1a5", "#ca357c"]);
        expect(scales).toEqual([]);
    });
}

for (const target of pagesFor("doughnut")) {
    test(`doughnut: falls back to the categorical order and draws no axes (${target.framework})`, async ({ page }) => {
        await page.goto(target.path);
        await waitForChart(page);
        const { data, scales } = await readChart(page);
        expect(data.labels).toEqual(["Approved", "Refused", "Pending"]);
        expect(data.datasets[0].backgroundColor).toEqual(["#1d70b8", "#0f385c", "#ca357c"]);
        expect(scales).toEqual([]);
    });
}

for (const target of pagesFor("area")) {
    test(`area: fills under each line with a see-through colour (${target.framework})`, async ({ page }) => {
        await page.goto(target.path);
        await waitForChart(page);
        const { data, scales } = await readChart(page);
        expect(data.datasets.map((d) => d.label)).toEqual(["Online", "Paper"]);
        expect(data.datasets.map((d) => d.fill)).toEqual(["origin", "origin"]);
        expect(data.datasets.map((d) => d.borderColor)).toEqual(["#0f385c", "#5694ca"]);
        expect(data.datasets.map((d) => d.backgroundColor)).toEqual(["#0f385c33", "#5694ca33"]);
        expect(data.datasets[1].borderDash?.length).toBeGreaterThan(0);
        expect(scales).toEqual(["x", "y"]);
    });
}

for (const target of pagesFor("radar")) {
    test(`radar: reads series like a line chart on a circular scale (${target.framework})`, async ({ page }) => {
        await page.goto(target.path);
        await waitForChart(page);
        const { data, scales } = await readChart(page);
        expect(data.labels).toEqual(["Speed", "Clarity", "Accessibility", "Support", "Reliability"]);
        expect(data.datasets.map((d) => d.label)).toEqual(["2025", "2026"]);
        expect(data.datasets[1].data).toEqual([7.4, 8.1, 7.9, 7.2, 8.6]);
        expect(data.datasets.map((d) => d.borderColor)).toEqual(["#0f385c", "#5694ca"]);
        expect(scales).toEqual(["r"]);
    });
}

for (const target of pagesFor("polar-area")) {
    test(`polar area: colours each slice from its row on a circular scale (${target.framework})`, async ({ page }) => {
        await page.goto(target.path);
        await waitForChart(page);
        const { data, scales } = await readChart(page);
        expect(data.labels).toEqual(["New", "Renewal", "Change of details", "Appeal"]);
        expect(data.datasets).toHaveLength(1);
        expect(data.datasets[0].data).toEqual([12, 5, 3, 28]);
        expect(data.datasets[0].backgroundColor).toEqual(["#0f385c", "#1d70b8", "#50a1a5", "#ca357c"]);
        expect(scales).toEqual(["r"]);
    });
}

test.describe("web component reacts to changes", () => {
    test("setting data redraws one chart with the new values", async ({ page }) => {
        await page.goto("/test/chart/pie/web-components");
        await waitForChart(page);
        await page.locator("iai-chart").evaluate((el) => {
            const chart = el as HTMLElement & { data: { datasets: { data: number[] }[] } };
            chart.data = { ...chart.data, datasets: [{ ...chart.data.datasets[0], data: [1, 2, 3, 4] }] };
        });
        await expect(page.locator(".iai-chart canvas")).toHaveCount(1);
        expect((await readChart(page)).data.datasets[0].data).toEqual([1, 2, 3, 4]);
        await page.getByText("Show data").click();
        await expect(page.locator(".iai-chart tbody td").first()).toHaveText("1");
    });

    test("changing the variant and title redraws the chart", async ({ page }) => {
        await page.goto("/test/chart/pie/web-components");
        await waitForChart(page);
        await page.locator("iai-chart").evaluate((el) => {
            el.setAttribute("variant", "doughnut");
            el.setAttribute("title", "Submissions this quarter");
        });
        await expect(page.locator(".iai-chart canvas")).toHaveCount(1);
        await expect(page.locator(".iai-chart canvas")).toHaveAccessibleName("Submissions this quarter");
        expect((await readChart(page)).type).toBe("doughnut");
    });
});
