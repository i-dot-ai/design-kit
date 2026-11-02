// i.AI Design System — Chart, drawn with Chart.js from the chart's data table.
//
// Markup:
//   <div class="iai-chart iai-chart--line" data-module="iai-chart">
//     <h3>Title</h3>
//     <details> ... <table> ... </table> ... </details>
//   </div>
//
// The first column holds the labels; each other column is a series. A series
// header may set `data-iai-chart-colour="<palette name>"` and
// `data-iai-chart-line="dashed|dotted"` (default solid). Pie, doughnut and
// polar area charts use the first series only and take colours from the row
// headers instead. The canvas is added here, so without JavaScript the table
// is all there is.

import Chart from "chart.js/auto";

const MODULE = "iai-chart";
// Modifier class -> Chart.js type.
const TYPES = {
    line: "line",
    area: "line",
    bar: "bar",
    pie: "pie",
    doughnut: "doughnut",
    radar: "radar",
    "polar-area": "polarArea",
};
// One series, coloured per row rather than per column.
const PER_ROW = ["pie", "doughnut", "polar-area"];
// Filled shapes that would hide the data behind them without transparency.
const SEE_THROUGH = ["area", "radar"];

// GOV.UK chart palette: https://brand.design-system.service.gov.uk/colour/charts/
export const CHART_COLOURS = {
    blue: "#1d70b8",
    "blue-tint-25": "#5694ca",
    "blue-tint-50": "#8eb8dc",
    "blue-tint-80": "#d2e2f1",
    "blue-shade-10": "#1a65a6",
    "blue-shade-25": "#16548a",
    "blue-shade-50": "#0f385c",
    magenta: "#ca357c",
    "magenta-tint-25": "#d7689d",
    "magenta-tint-50": "#e59abe",
    "magenta-tint-80": "#f4d7e5",
    "magenta-shade-25": "#98285d",
    "magenta-shade-50": "#651b3e",
    red: "#ca3535",
    "red-tint-25": "#d76868",
    "red-tint-50": "#e59a9a",
    "red-tint-80": "#f4d7d7",
    "red-shade-25": "#982828",
    "red-shade-50": "#651b1b",
    green: "#0f7a52",
    "green-tint-25": "#4b9b7d",
    "green-tint-50": "#87bca8",
    "green-tint-80": "#cfe4dc",
    "green-shade-25": "#0b5c3e",
    "green-shade-50": "#083d29",
    purple: "#54319f",
    "purple-tint-25": "#7f65b7",
    "purple-tint-50": "#aa98cf",
    "purple-tint-80": "#ddd6ec",
    "purple-shade-25": "#3f2577",
    "purple-shade-50": "#2a1950",
    teal: "#158187",
    "teal-tint-25": "#50a1a5",
    "teal-tint-50": "#8ac0c3",
    "teal-tint-80": "#d0e6e7",
    "teal-shade-25": "#106165",
    "teal-shade-50": "#0b4144",
    orange: "#f47738",
    "orange-tint-25": "#f7996a",
    "orange-tint-50": "#fabb9c",
    "orange-tint-80": "#fde4d7",
    "orange-shade-25": "#b7592a",
    "orange-shade-50": "#7a3c1c",
    black: "#0b0c0c",
    "black-tint-25": "#484949",
    "black-tint-50": "#858686",
    "black-tint-80": "#cecece",
};

// The categorical order, used for series without a colour.
const DEFAULT_ORDER = ["blue", "blue-shade-50", "magenta", "purple-tint-25", "teal-tint-25", "orange-tint-25"];
const LABEL_COLOUR = CHART_COLOURS.black;
const LINE_COLOUR = CHART_COLOURS["black-tint-80"];
const LINE_STYLES = { dashed: [8, 4], dotted: [2, 3] };

const format = (value) => value.toLocaleString("en-GB", { maximumFractionDigits: 2 });

/** Format a value the way `parseValue` reads it back. Used by the framework wrappers. */
export const formatChartValue = (value) => (value == null ? "–" : format(value));

// shortcut: reads en-GB text ("1,240.5", "£12", "40%"); add a data-value
// attribute if cells ever show values the text cannot be read back from.
export function parseValue(text) {
    const cleaned = text.replace(/[^\d.-]/g, "");
    const value = cleaned === "" ? NaN : Number(cleaned);
    return Number.isFinite(value) ? value : null;
}

const colourFor = (th, i) =>
    CHART_COLOURS[th.dataset.iaiChartColour] ?? CHART_COLOURS[DEFAULT_ORDER[i % DEFAULT_ORDER.length]];

function readTable(table, variant) {
    const headers = Array.from(table.querySelectorAll("thead th")).slice(1);
    const rows = Array.from(table.querySelectorAll("tbody tr"));
    const labels = rows.map((row) => row.cells[0].textContent.trim());
    const column = (i) => rows.map((row) => parseValue(row.cells[i + 1]?.textContent ?? ""));

    if (PER_ROW.includes(variant)) {
        return {
            labels,
            datasets: [
                {
                    label: headers[0]?.textContent.trim() ?? "",
                    data: column(0),
                    backgroundColor: rows.map((row, i) => colourFor(row.cells[0], i)),
                    borderColor: "#ffffff",
                },
            ],
        };
    }

    const seeThrough = SEE_THROUGH.includes(variant);
    return {
        labels,
        datasets: headers.map((th, i) => {
            const colour = colourFor(th, i);
            return {
                label: th.textContent.trim(),
                data: column(i),
                borderColor: colour,
                // 33 = 20% opacity, so overlapping series stay visible.
                backgroundColor: seeThrough ? `${colour}33` : colour,
                borderDash: LINE_STYLES[th.dataset.iaiChartLine],
                ...(variant === "area" ? { fill: "origin" } : {}),
            };
        }),
    };
}

function scalesFor(variant, font) {
    const grid = { color: LINE_COLOUR };
    const ticks = { color: LABEL_COLOUR, font, callback: (value) => format(Number(value)) };
    if (variant === "pie" || variant === "doughnut") return {};
    if (variant === "radar" || variant === "polar-area") {
        // ticks.z: 1 draws the scale numbers above the slices, on their white backdrop.
        return { r: { beginAtZero: true, grid, angleLines: grid, pointLabels: { color: LABEL_COLOUR, font }, ticks: { ...ticks, z: 1 } } };
    }
    return {
        x: { grid, ticks: { color: LABEL_COLOUR, font } },
        y: { beginAtZero: true, grid, ticks },
    };
}

// Chart.js gives a number for pie/doughnut, { r } on circular scales, { y } otherwise.
const valueOf = (parsed) => (typeof parsed === "number" ? parsed : (parsed?.r ?? parsed?.y ?? 0));

/**
 * Draw a chart from its table. Idempotent: returns the existing chart if
 * already drawn. Call `.destroy()` on the result before redrawing.
 * @param {HTMLElement} el
 * @returns {Chart | undefined}
 */
export function initChart(el) {
    if (!el) return undefined;
    if (el.iaiChart) return el.iaiChart;
    const table = el.querySelector("table");
    const variant = Object.keys(TYPES).find((t) => el.classList.contains(`${MODULE}--${t}`));
    if (!table || !variant) return undefined;

    const container = document.createElement("div");
    container.className = "iai-chart__canvas";
    const canvas = document.createElement("canvas");
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", el.querySelector("h1, h2, h3, h4, h5, h6")?.textContent.trim() ?? "");
    container.append(canvas);
    el.querySelector("details")?.before(container);

    const perRow = PER_ROW.includes(variant);
    // Use the kit's font (set on the wrapper in CSS) rather than Chart.js's Helvetica default.
    const font = { family: getComputedStyle(container).fontFamily, size: 14 };
    // Line samples (not boxes) in the legend so dashed and dotted series are recognisable.
    const lineLegend = !perRow && variant !== "bar";
    const chart = new Chart(canvas, {
        type: TYPES[variant],
        data: readTable(table, variant),
        options: {
            color: LABEL_COLOUR,
            scales: scalesFor(variant, font),
            plugins: {
                legend: {
                    labels: {
                        font,
                        ...(lineLegend
                            ? {
                                  boxHeight: 0,
                                  generateLabels: (c) =>
                                      Chart.defaults.plugins.legend.labels.generateLabels(c).map((label) => ({
                                          ...label,
                                          fillStyle: "transparent",
                                          lineWidth: 3,
                                      })),
                              }
                            : {}),
                    },
                },
                tooltip: {
                    bodyFont: font,
                    titleFont: font,
                    callbacks: {
                        label: (item) =>
                            `${perRow ? item.label : item.dataset.label}: ${format(valueOf(item.parsed))}`,
                    },
                },
            },
        },
    });

    const destroy = chart.destroy.bind(chart);
    let destroyed = false;
    chart.destroy = () => {
        destroyed = true;
        destroy();
        container.remove();
        delete el.iaiChart;
    };
    // Charts drawn before the web font loads are measured in a fallback font; redraw once it has.
    // shortcut: clears Chart.js's private text-width cache (no public API); recheck on Chart.js upgrades.
    document.fonts?.ready.then(() => {
        if (destroyed) return;
        Object.values(chart.scales).forEach((scale) => (scale._longestTextCache = {}));
        chart.update("none");
    });
    el.iaiChart = chart;
    return chart;
}

/** Draw every chart on the page. Idempotent. */
export function initAllCharts() {
    document.querySelectorAll(`[data-module="${MODULE}"]`).forEach(initChart);
}
