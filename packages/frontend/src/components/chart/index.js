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
// `data-iai-chart-line="dashed|dotted"` (default solid). The canvas is added
// here, so without JavaScript the table is all there is.

import Chart from "chart.js/auto";

const MODULE = "iai-chart";
const TYPES = ["line"];

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

// shortcut: reads en-GB text ("1,240.5", "£12", "40%"); add a data-value
// attribute if cells ever show values the text cannot be read back from.
export function parseValue(text) {
    const cleaned = text.replace(/[^\d.-]/g, "");
    const value = cleaned === "" ? NaN : Number(cleaned);
    return Number.isFinite(value) ? value : null;
}

function readTable(table) {
    const headers = Array.from(table.querySelectorAll("thead th")).slice(1);
    const rows = Array.from(table.querySelectorAll("tbody tr"));
    return {
        labels: rows.map((row) => row.cells[0].textContent.trim()),
        datasets: headers.map((th, i) => {
            const colour =
                CHART_COLOURS[th.dataset.iaiChartColour] ??
                CHART_COLOURS[DEFAULT_ORDER[i % DEFAULT_ORDER.length]];
            return {
                label: th.textContent.trim(),
                data: rows.map((row) => parseValue(row.cells[i + 1]?.textContent ?? "")),
                borderColor: colour,
                backgroundColor: colour,
                borderDash: LINE_STYLES[th.dataset.iaiChartLine],
            };
        }),
    };
}

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
    const type = TYPES.find((t) => el.classList.contains(`${MODULE}--${t}`));
    if (!table || !type) return undefined;

    const container = document.createElement("div");
    container.className = "iai-chart__canvas";
    const canvas = document.createElement("canvas");
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", el.querySelector("h1, h2, h3, h4, h5, h6")?.textContent.trim() ?? "");
    container.append(canvas);
    el.querySelector("details")?.before(container);

    const grid = { color: LINE_COLOUR };
    const chart = new Chart(canvas, {
        type,
        data: readTable(table),
        options: {
            color: LABEL_COLOUR,
            scales: {
                x: { grid, ticks: { color: LABEL_COLOUR } },
                y: {
                    beginAtZero: true,
                    grid,
                    ticks: { color: LABEL_COLOUR, callback: (value) => format(Number(value)) },
                },
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: (item) => `${item.dataset.label}: ${format(item.parsed.y ?? 0)}`,
                    },
                },
            },
        },
    });

    const destroy = chart.destroy.bind(chart);
    chart.destroy = () => {
        destroy();
        container.remove();
        delete el.iaiChart;
    };
    el.iaiChart = chart;
    return chart;
}

/** Draw every chart on the page. Idempotent. */
export function initAllCharts() {
    document.querySelectorAll(`[data-module="${MODULE}"]`).forEach(initChart);
}
