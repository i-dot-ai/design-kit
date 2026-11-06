import { test, expect, type Page } from "@playwright/test";
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
            test.skip(target.framework === "web-components", "web components need JavaScript to render anything");
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

for (const framework of ["html", "astro", "web-components"]) {
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

for (const framework of ["html", "astro", "web-components"]) {
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
    // HTML, Astro and web components: Intl.NumberFormat options, values in minutes.
    ...["html", "astro", "web-components"].map((framework) => ({
        framework,
        variant: "line-format",
        median: [12.4, 11.5, 15.2, 18.1, 14.3, 13.3],
        firstCell: { value: "12.4", text: /^12\.4 min/ },
    })),
    // React, Solid, Svelte, web components: a format function, values in seconds.
    ...["react", "solid", "svelte", "web-components"].map((framework) => ({
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
for (const framework of ["html", "astro", "web-components"]) {
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

for (const framework of ["solid", "svelte"]) {
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

test.describe("pie legend and labels", () => {
    const legendShown = (page: Page) =>
        page.locator(".iai-chart").evaluate(
            (el) => (el as HTMLElement & { iaiChart: { legend: { options: { display: boolean } } } }).iaiChart.legend.options.display,
        );
    const setSlices = (page: Page, labels: string[]) =>
        page.locator("iai-chart").evaluate((el, labels) => {
            const chart = el as HTMLElement & { data: { labels: string[]; datasets: { data: number[] }[] } };
            chart.data = { ...chart.data, labels, datasets: [{ ...chart.data.datasets[0], data: labels.map((_, i) => i + 1) }] };
        }, labels);

    test("more than 6 slices uses the legend instead of labels", async ({ page }) => {
        await page.goto("/test/chart/pie/web-components");
        await waitForChart(page);
        await setSlices(page, ["A", "B", "C", "D", "E", "F", "G"]);
        await expect.poll(() => legendShown(page)).toBe(true);
    });

    test("a single slice has no legend, even when narrow", async ({ page }) => {
        await page.setViewportSize({ width: 360, height: 800 });
        await page.goto("/test/chart/pie/web-components");
        await waitForChart(page);
        await setSlices(page, ["All"]);
        await expect.poll(() => legendShown(page)).toBe(false);
    });
});

test("chart text follows the browser font size", async ({ page }) => {
    await page.goto("/test/chart/pie/web-components");
    await waitForChart(page);
    const size = await page.locator("iai-chart").evaluate((el) => {
        document.documentElement.style.fontSize = "20px";
        const chart = el as HTMLElement & { data: unknown };
        chart.data = { ...(chart.data as object) };
        return (el as HTMLElement & { iaiChart: { options: { plugins: { legend: { labels: { font: { size: number } } } } } } }).iaiChart
            .options.plugins.legend.labels.font.size;
    });
    expect(size).toBe(20);
});

test("high contrast mode gives the chart a white background", async ({ page, browserName }) => {
    test.skip(browserName === "webkit", "WebKit cannot emulate forced colours");
    await page.emulateMedia({ forcedColors: "active" });
    await page.goto("/test/chart/bar/html");
    await waitForChart(page);
    await expect(page.locator(".iai-chart__canvas")).toHaveCSS("background-color", "rgb(255, 255, 255)");
});

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
        await page.getByText("Show data", { exact: false }).first().click();
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
