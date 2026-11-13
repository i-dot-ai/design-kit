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
            await page.getByText("Show data", { exact: false }).first().click();
            await expect(page.locator(".iai-chart table")).toBeVisible();
        });

        test("without JavaScript the table is still there and no canvas is drawn", async ({ browser }) => {
            const context = await browser.newContext({ javaScriptEnabled: false });
            const page = await context.newPage();
            await page.goto(target.path);
            await expect(page.locator(".iai-chart canvas")).toHaveCount(0);
            await page.getByText("Show data", { exact: false }).first().click();
            await expect(page.locator(".iai-chart table")).toBeVisible();
            await context.close();
        });
    });
}

for (const target of pagesFor("line")) {
    test(`line: reads the series and gaps, with default colours and line styles (${target.framework})`, async ({ page }) => {
        await page.goto(target.path);
        await waitForChart(page);
        const { data } = await readChart(page);
        expect(data.labels).toEqual(["January", "February", "March", "April", "May", "June"]);
        expect(data.datasets.map((d) => d.label)).toEqual(["2024", "2025", "2026"]);
        expect(data.datasets[0].data).toEqual([1200, 1350, 1500, 1420, 1600, 1650]);
        expect(data.datasets[2].data).toEqual([1600, 1720, 1880, 1950, 2040, null]);
        expect(data.datasets.map((d) => d.borderColor)).toEqual(["#1d70b8", "#0f385c", "#ca357c"]);
        const [solid, dashed, dotted] = data.datasets.map((d) => d.borderDash);
        expect(solid).toBeUndefined();
        expect(dashed?.length).toBeGreaterThan(0);
        expect(dotted?.length).toBeGreaterThan(0);
        expect(dotted).not.toEqual(dashed);
    });
}

for (const target of pagesFor("bar")) {
    test(`bar: reads the series, with default colours (${target.framework})`, async ({ page }) => {
        await page.goto(target.path);
        await waitForChart(page);
        const { data } = await readChart(page);
        expect(data.labels).toEqual(["North", "Midlands", "South", "Wales", "Scotland"]);
        expect(data.datasets.map((d) => d.label)).toEqual(["2025", "2026"]);
        expect(data.datasets[0].data).toEqual([2400, 1850, 3100, 950, 1300]);
        expect(data.datasets.map((d) => d.backgroundColor)).toEqual(["#1d70b8", "#0f385c"]);
    });
}

for (const target of pagesFor("pie")) {
    test(`pie: colours slices in the default order and draws no axes (${target.framework})`, async ({ page }) => {
        await page.goto(target.path);
        await waitForChart(page);
        const { data, scales } = await readChart(page);
        expect(data.labels).toEqual(["Online", "Phone", "Post", "In person"]);
        expect(data.datasets).toHaveLength(1);
        expect(data.datasets[0].data).toEqual([6200, 1450, 820, 330]);
        expect(data.datasets[0].backgroundColor).toEqual(["#1d70b8", "#0f385c", "#ca357c", "#7f65b7"]);
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
        expect(data.datasets.map((d) => d.borderColor)).toEqual(["#1d70b8", "#0f385c"]);
        expect(data.datasets.map((d) => d.backgroundColor)).toEqual(["#1d70b833", "#0f385c33"]);
        expect(data.datasets[1].borderDash?.length).toBeGreaterThan(0);
        expect(scales).toEqual(["x", "y"]);
    });
}

for (const framework of ["html"]) {
    test(`description: the canvas is described by the chart's description (${framework})`, async ({ page }) => {
        await page.goto(`/test/chart/bar-description/${framework}`);
        await waitForChart(page);
        await expect(page.locator(".iai-chart h2")).toHaveText("Applications received by region");
        await expect(page.locator(".iai-chart canvas")).toHaveAccessibleDescription(
            "Applications rose in every region from 2025 to 2026. The South received the most in both years.",
        );
    });
}

test("clicking the legend does not hide a series", async ({ page }) => {
    await page.goto("/test/chart/line/html");
    await waitForChart(page);
    const canvas = page.locator(".iai-chart canvas");
    const box = await canvas.evaluate((el) => {
        const chart = (el.closest(".iai-chart") as HTMLElement & {
            iaiChart: { legend: { legendHitBoxes: { left: number; top: number; width: number; height: number }[] } };
        }).iaiChart;
        return chart.legend.legendHitBoxes[0];
    });
    await canvas.click({ position: { x: box.left + box.width / 2, y: box.top + box.height / 2 } });
    const visible = await canvas.evaluate((el) =>
        (el.closest(".iai-chart") as HTMLElement & { iaiChart: { isDatasetVisible: (i: number) => boolean } }).iaiChart.isDatasetVisible(0),
    );
    expect(visible).toBe(true);
});

for (const target of pagesFor("horizontal-bar")) {
    test(`horizontal bar: draws bars along the x axis with their values (${target.framework})`, async ({ page }) => {
        await page.goto(target.path);
        await waitForChart(page);
        const { data, scales } = await readChart(page);
        expect(data.datasets[0].data).toEqual([2650, 2100, 3350, 1020, 1410]);
        expect(scales).toEqual(["x", "y"]);
        const indexAxis = await page.locator(".iai-chart").evaluate(
            (el) => (el as HTMLElement & { iaiChart: { options: { indexAxis: string } } }).iaiChart.options.indexAxis,
        );
        expect(indexAxis).toBe("y");
        const legendShown = await page.locator(".iai-chart").evaluate(
            (el) => (el as HTMLElement & { iaiChart: { legend: { options: { display: boolean } } } }).iaiChart.legend.options.display,
        );
        expect(legendShown).toBe(false);
    });
}

for (const target of [...pagesFor("line"), ...pagesFor("area"), ...pagesFor("bar")]) {
    test(`${target.variant}: draws only horizontal grid lines by default (${target.framework})`, async ({ page }) => {
        await page.goto(target.path);
        await waitForChart(page);
        expect((await readChart(page)).grid).toEqual({ x: false, y: true });
    });
}

for (const target of pagesFor("horizontal-bar")) {
    test(`horizontal bar: draws only vertical grid lines by default (${target.framework})`, async ({ page }) => {
        await page.goto(target.path);
        await waitForChart(page);
        expect((await readChart(page)).grid).toEqual({ x: true, y: false });
    });
}

// line-grid examples set gridLines="both" (data-iai-chart-grid-lines in HTML), overriding the defaults.
for (const target of pagesFor("line-grid")) {
    test(`line grid: gridLines "both" restores both directions (${target.framework})`, async ({ page }) => {
        await page.goto(target.path);
        await waitForChart(page);
        expect((await readChart(page)).grid).toEqual({ x: true, y: true });
    });
}

for (const variant of ["pie", "doughnut"]) {
    test(`${variant}: labels slices directly and hides the legend, falling back to it when narrow`, async ({ page }) => {
        const legendShown = () =>
            page.locator(".iai-chart").evaluate(
                (el) => (el as HTMLElement & { iaiChart: { legend: { options: { display: boolean } } } }).iaiChart.legend.options.display,
            );
        await page.goto(`/test/chart/${variant}/html`);
        await waitForChart(page);
        expect(await legendShown()).toBe(false);
        await page.setViewportSize({ width: 360, height: 800 });
        await expect.poll(legendShown).toBe(true);
    });
}

for (const framework of ["html"]) {
    test(`line style and colour set on a series reach the drawn chart (${framework})`, async ({ page }) => {
        await page.goto(`/test/chart/line-style/${framework}`);
        await waitForChart(page);
        expect((await readChart(page)).data.datasets.map((d) => d.borderDash)).toEqual([[2, 3], [8, 4], undefined]);
        await page.goto(`/test/chart/line-colour/${framework}`);
        await waitForChart(page);
        expect((await readChart(page)).data.datasets.map((d) => d.borderColor)).toEqual(["#0f385c", "#1d70b8", "#5694ca"]);
    });
}

const FORMAT_CASES = [
    // HTML: Intl.NumberFormat options, values in minutes.
    ...["html"].map((framework) => ({
        framework,
        variant: "line-format",
        median: [12.4, 11.5, 15.2, 18.1, 14.3, 13.3],
        firstCell: { value: "12.4", text: /^12\.4 min/ },
    })),
    // React, Solid, Svelte: a format function, values in seconds.
    ...["react", "solid", "svelte"].map((framework) => ({
        framework,
        variant: "line-format-function",
        median: [744, 690, 912, 1083, 856, 798],
        firstCell: { value: "744", text: /^12m 24s$/ },
        shown: { value: 3723, text: "1h 2m 3s" },
    })),
];

for (const { framework, variant, median, firstCell, shown } of FORMAT_CASES as { framework: string; variant: string; median: number[]; firstCell: { value: string; text: RegExp }; shown?: { value: number; text: string } }[]) {
    test(`${variant}: the chart reads the real values behind formatted table text (${framework})`, async ({ page }) => {
        await page.goto(`/test/chart/${variant}/${framework}`);
        await waitForChart(page);
        expect((await readChart(page)).data.datasets[0].data).toEqual(median);
        await page.getByText("Show data", { exact: false }).first().click();
        const cell = page.locator(".iai-chart tbody td").first();
        await expect(cell).toHaveAttribute("data-value", firstCell.value);
        await expect(cell).toHaveText(firstCell.text);
    });

    if (!shown) continue;
    test(`${variant}: the axis ticks and tooltips use the format (${framework})`, async ({ page }) => {
        await page.goto(`/test/chart/${variant}/${framework}`);
        await waitForChart(page);
        const text = await page.locator(".iai-chart").evaluate((el, value) => {
            const chart = (el as HTMLElement & {
                iaiChart: {
                    options: {
                        scales: { y: { ticks: { callback: (value: number) => string } } };
                        plugins: { tooltip: { callbacks: { label: (item: { raw: number; dataset: { label: string } }) => string } } };
                    };
                };
            }).iaiChart;
            return {
                tick: chart.options.scales.y.ticks.callback(value),
                tooltip: chart.options.plugins.tooltip.callbacks.label({ raw: value, dataset: { label: "Slowest 10%" } }),
            };
        }, shown.value);
        expect(text.tick).toBe(shown.text);
        expect(text.tooltip).toBe(`Slowest 10%: ${shown.text}`);
    });
}

// Unit names vary between browsers' Intl data (WebKit says "min", Chromium "mins"), so compare with the browser's own.
for (const framework of ["html"]) {
    test(`line-format: the axis ticks and tooltips use the Intl.NumberFormat options (${framework})`, async ({ page }) => {
        await page.goto(`/test/chart/line-format/${framework}`);
        await waitForChart(page);
        const text = await page.locator(".iai-chart").evaluate((el) => {
            const chart = (el as HTMLElement & {
                iaiChart: {
                    options: {
                        scales: { y: { ticks: { callback: (value: number) => string } } };
                        plugins: { tooltip: { callbacks: { label: (item: { raw: number; dataset: { label: string } }) => string } } };
                    };
                };
            }).iaiChart;
            return {
                expected: new Intl.NumberFormat("en-GB", { style: "unit", unit: "minute", maximumFractionDigits: 1 }).format(62.1),
                tick: chart.options.scales.y.ticks.callback(62.1),
                tooltip: chart.options.plugins.tooltip.callbacks.label({ raw: 62.1, dataset: { label: "Slowest 10%" } }),
            };
        });
        expect(text.tick).toMatch(/^62\.1 min/);
        expect(text.tick).toBe(text.expected);
        expect(text.tooltip).toBe(`Slowest 10%: ${text.expected}`);
    });
}

for (const framework of ["react", "solid", "svelte"]) {
    test(`format: changing only the format redraws the axes and tooltips (${framework})`, async ({ page }) => {
        await page.goto(`/test/chart/format-change/${framework}`);
        await waitForChart(page);
        const tick = () =>
            page.locator(".iai-chart").evaluate((el) =>
                (el as HTMLElement & { iaiChart: { options: { scales: { y: { ticks: { callback: (value: number) => string } } } } } }).iaiChart.options.scales.y.ticks.callback(744),
            );
        expect(await tick()).toBe("744s");
        await page.getByTestId("change-format").click();
        await expect.poll(tick).toBe("744sec");
        await page.getByText("Show data", { exact: false }).first().click();
        await expect(page.locator(".iai-chart tbody td").first()).toHaveText("744sec");
        await expect(page.locator(".iai-chart canvas")).toHaveCount(1);
    });
}

test("format: a new inline format that shows the same text does not redraw the chart (react)", async ({ page }) => {
    await page.goto("/test/chart/format-change/react");
    await waitForChart(page);
    await page.locator(".iai-chart canvas").evaluate((canvas) => canvas.setAttribute("data-test-first", ""));
    await page.getByTestId("re-render").click();
    await expect(page.getByTestId("re-render")).toHaveText("Re-render 1");
    await expect(page.locator(".iai-chart canvas[data-test-first]")).toHaveCount(1);
});

test("high contrast mode gives the chart a white background", async ({ page, browserName }) => {
    test.skip(browserName === "webkit", "WebKit cannot emulate forced colours");
    await page.emulateMedia({ forcedColors: "active" });
    await page.goto("/test/chart/bar/html");
    await waitForChart(page);
    await expect(page.locator(".iai-chart__canvas")).toHaveCSS("background-color", "rgb(255, 255, 255)");
});

