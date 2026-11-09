// i.AI Design System — Chart, drawn with Chart.js from the chart's data table.
//
// Markup:
//   <div class="iai-chart iai-chart--line" data-module="iai-chart">
//     <h3>Title</h3>
//     <p class="iai-chart__description">Optional summary</p>
//     <details> ... <table> ... </table> ... </details>
//   </div>
//
// The first column holds the labels; each other column is a series. A series
// header may set `data-iai-chart-colour="<palette name>"` and
// `data-iai-chart-line="solid|dashed|dotted"`; without them, series follow the
// default colour and line style orders. Pie and doughnut charts use the first
// series only and take colours from the row
// headers instead. The canvas is added here, so without JavaScript the table
// is all there is.

import Chart from "chart.js/auto";

const MODULE = "iai-chart";
// Modifier class -> Chart.js type.
const TYPES = {
    line: "line",
    area: "line",
    bar: "bar",
    "horizontal-bar": "bar",
    pie: "pie",
    doughnut: "doughnut",
};
// One series, coloured per row rather than per column.
const PER_ROW = ["pie", "doughnut"];
// Filled shapes that would hide the data behind them without transparency.
const SEE_THROUGH = ["area"];

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
const LINE_STYLES = { solid: undefined, dashed: [8, 4], dotted: [2, 3] };
// The line style order, used for series without a line style.
const DEFAULT_LINE_ORDER = ["solid", "dashed", "dotted"];

// Two decimal places at most, unless the options set their own (merging both can be out of range and throw)
// or are a currency, which has its own number of decimals.
const withDefaults = (options) =>
    options == null
        ? { maximumFractionDigits: 2 }
        : "minimumFractionDigits" in options || "maximumFractionDigits" in options || options.style === "currency"
          ? options
          : { maximumFractionDigits: 2, ...options };

const format = (value, options) => value.toLocaleString("en-GB", withDefaults(options));

/** Format a value for the table, with optional `Intl.NumberFormat` options. Used by the framework wrappers. */
export const formatChartValue = (value, options) => (value == null ? "–" : format(value, options));

// Plain HTML and Astro charts cannot pass a function, so they set Intl.NumberFormat options as JSON on the chart.
function formatFromMarkup(el) {
    const json = el.dataset.iaiChartFormat;
    if (!json) return format;
    try {
        const formatter = new Intl.NumberFormat("en-GB", withDefaults(JSON.parse(json)));
        return (value) => formatter.format(value);
    } catch (error) {
        console.error("iai-chart: data-iai-chart-format is not valid Intl.NumberFormat options as JSON.", error);
        return format;
    }
}

export function parseValue(text) {
    const cleaned = text.replace(/[^\d.-]/g, "");
    const value = cleaned === "" ? NaN : Number(cleaned);
    return Number.isFinite(value) ? value : null;
}

const colourFor = (th, i) =>
    CHART_COLOURS[th.dataset.iaiChartColour] ?? CHART_COLOURS[DEFAULT_ORDER[i % DEFAULT_ORDER.length]];

const lineFor = (th, i) => {
    const style = th.dataset.iaiChartLine;
    return LINE_STYLES[style in LINE_STYLES ? style : DEFAULT_LINE_ORDER[i % DEFAULT_LINE_ORDER.length]];
};

function readTable(table, variant, showNullValuesAsZero) {
    const headers = Array.from(table.querySelectorAll("thead th")).slice(1);
    const rows = Array.from(table.querySelectorAll("tbody tr"));
    const labels = rows.map((row) => row.cells[0].textContent.trim());
    // A data-value attribute beats the text, so cells can show a value the text cannot be read back from.
    const column = (i) =>
        rows.map((row) => {
            const value = parseValue(row.cells[i + 1]?.dataset.value ?? row.cells[i + 1]?.textContent ?? "");
            return showNullValuesAsZero && value == null ? 0 : value;
        });

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
                borderDash: TYPES[variant] === "bar" ? undefined : lineFor(th, i),
                ...(variant === "area" ? { fill: "origin" } : {}),
            };
        }),
    };
}

function scalesFor(variant, font, formatValue) {
    const grid = { color: LINE_COLOUR };
    const ticks = { color: LABEL_COLOUR, font, callback: (value) => formatValue(Number(value)) };
    if (variant === "pie" || variant === "doughnut") return {};
    if (variant === "horizontal-bar") {
        return {
            x: { beginAtZero: true, grid, ticks },
            y: { grid, ticks: { color: LABEL_COLOUR, font } },
        };
    }
    return {
        x: { grid, ticks: { color: LABEL_COLOUR, font } },
        y: { beginAtZero: true, grid, ticks },
    };
}

let descriptionCount = 0;

const cssFont = (font) => `${font.size}px ${font.family}`;

function widest(chart, font, texts) {
    const { ctx } = chart;
    ctx.save();
    ctx.font = cssFont(font);
    const width = Math.max(0, ...texts.map((text) => ctx.measureText(text).width));
    ctx.restore();
    return width;
}

const barValues = (chart, formatValue) =>
    chart.data.datasets.flatMap((dataset) => dataset.data.filter((value) => value != null).map((value) => formatValue(value)));

// shortcut: room is only made on the right, so labels on negative bars can overlap the axis; pad the left too if needed.
function barValueLabels(font, formatValue) {
    return {
        id: "iaiBarValueLabels",
        afterDatasetsDraw(chart) {
            const bars = chart.data.datasets.flatMap((_, i) => chart.getDatasetMeta(i).data);
            // All or none, so a crowded chart does not show labels on only some bars.
            if (bars.some((bar) => bar.getProps(["height"]).height < font.size)) return;
            const { ctx } = chart;
            ctx.save();
            ctx.font = cssFont(font);
            ctx.fillStyle = LABEL_COLOUR;
            ctx.textBaseline = "middle";
            chart.data.datasets.forEach((dataset, i) =>
                chart.getDatasetMeta(i).data.forEach((bar, j) => {
                    const value = dataset.data[j];
                    if (value == null) return;
                    const { x, y, base } = bar.getProps(["x", "y", "base"]);
                    const after = x >= base;
                    ctx.textAlign = after ? "left" : "right";
                    ctx.fillText(formatValue(value), x + (after ? 4 : -4), y);
                }),
            );
            ctx.restore();
        },
    };
}

const SLICE_LABEL_GAP = 16;
// Narrower than this and the labels would squeeze the circle, so the legend is used instead.
const MIN_LABELLED_CIRCLE = 240;
// More slices than this and the labels stack too far to read; ONS also advises no more than 6.
const MAX_LABELLED_SLICES = 6;

const sliceText = (chart, i, formatValue) => `${chart.data.labels[i]}: ${formatValue(chart.data.datasets[0].data[i] ?? 0)}`;

function sliceLabels(font, formatValue) {
    const lineHeight = font.size + 4;
    return {
        id: "iaiSliceLabels",
        beforeUpdate(chart) {
            const room = widest(chart, font, chart.data.labels.map((_, i) => sliceText(chart, i, formatValue))) + SLICE_LABEL_GAP * 2 + 4;
            chart.$iaiSliceLabelRoom =
                chart.data.labels.length <= MAX_LABELLED_SLICES && chart.width - room * 2 >= MIN_LABELLED_CIRCLE ? room : 0;
            chart.config.options.plugins.legend.display = !chart.$iaiSliceLabelRoom && chart.data.labels.length > 1;
        },
        afterDatasetsDraw(chart) {
            if (!chart.$iaiSliceLabelRoom) return;
            const values = chart.data.datasets[0].data;
            const labels = chart
                .getDatasetMeta(0)
                .data.map((arc, i) => {
                    const { x, y, startAngle, endAngle, outerRadius } = arc.getProps(["x", "y", "startAngle", "endAngle", "outerRadius"]);
                    const angle = (startAngle + endAngle) / 2;
                    const out = outerRadius + SLICE_LABEL_GAP;
                    return {
                        i,
                        x,
                        r: outerRadius,
                        right: Math.cos(angle) >= 0,
                        rim: [x + Math.cos(angle) * outerRadius, y + Math.sin(angle) * outerRadius],
                        elbowX: x + Math.cos(angle) * out,
                        y: y + Math.sin(angle) * out,
                    };
                })
                .filter((label) => values[label.i]);
            // Push labels down so ones for small neighbouring slices do not overlap.
            for (const right of [true, false]) {
                let last = -Infinity;
                labels
                    .filter((label) => label.right === right)
                    .sort((a, b) => a.y - b.y)
                    .forEach((label) => {
                        label.y = Math.max(label.y, last + lineHeight);
                        last = label.y;
                    });
            }
            const { ctx } = chart;
            ctx.save();
            ctx.font = cssFont(font);
            ctx.fillStyle = LABEL_COLOUR;
            ctx.strokeStyle = CHART_COLOURS["black-tint-50"];
            ctx.textBaseline = "middle";
            labels.forEach((label) => {
                const side = label.right ? 1 : -1;
                const end = label.x + side * (label.r + SLICE_LABEL_GAP * 2);
                ctx.beginPath();
                ctx.moveTo(...label.rim);
                ctx.lineTo(label.elbowX, label.y);
                ctx.lineTo(end, label.y);
                ctx.stroke();
                ctx.textAlign = label.right ? "left" : "right";
                ctx.fillText(sliceText(chart, label.i, formatValue), end + side * 4, label.y);
            });
            ctx.restore();
        },
    };
}

/**
 * Draw a chart from its table. Idempotent: returns the existing chart if
 * already drawn. Call `.destroy()` on the result before redrawing.
 * @param {HTMLElement} el
 * @param {{ format?: (value: number) => string, showNullValuesAsZero?: boolean }} [options] - `format` replaces
 * the default en-GB number formatting wherever values are shown. Without it,
 * the chart's `data-iai-chart-format` Intl.NumberFormat options are used.
 * `showNullValuesAsZero` plots `null` values as 0, keeping a line unbroken; the table still shows –.
 * @returns {Chart | undefined}
 */
export function initChart(el, { format: formatValue, showNullValuesAsZero } = {}) {
    if (!el) return undefined;
    if (el.iaiChart) {
        // initAllCharts may have drawn it first without the caller's options; redraw with them.
        if (
            (!formatValue || el.iaiChart.$iaiFormat === formatValue) &&
            el.iaiChart.$iaiShowNulls === !!showNullValuesAsZero
        )
            return el.iaiChart;
        el.iaiChart.destroy();
    }
    const requestedFormat = formatValue;
    const requestedShowNulls = showNullValuesAsZero;
    const table = el.querySelector("table");
    const variant = Object.keys(TYPES).find((t) => el.classList.contains(`${MODULE}--${t}`));
    if (!table || !variant) return undefined;
    formatValue ??= formatFromMarkup(el);
    // Plain HTML and Astro set the flag as an empty attribute instead of an option.
    showNullValuesAsZero ??= el.dataset.iaiChartShowNullValuesAsZero != null;

    const container = document.createElement("div");
    container.className = "iai-chart__canvas";
    const canvas = document.createElement("canvas");
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", el.querySelector("h1, h2, h3, h4, h5, h6")?.textContent.trim() ?? "");
    const description = el.querySelector(".iai-chart__description");
    if (description) {
        description.id ||= `iai-chart-description-${++descriptionCount}`;
        canvas.setAttribute("aria-describedby", description.id);
    }
    container.append(canvas);
    el.querySelector("details")?.before(container);

    const perRow = PER_ROW.includes(variant);
    // Use the kit's font and 1rem size (set on the wrapper in CSS), so chart text follows the browser's font size.
    const style = getComputedStyle(container);
    const font = { family: style.fontFamily, size: parseFloat(style.fontSize) };
    // Line samples (not boxes) in the legend so dashed and dotted series are recognisable.
    const lineLegend = !perRow && TYPES[variant] !== "bar";
    const labelled = variant === "pie" || variant === "doughnut";
    const data = readTable(table, variant, showNullValuesAsZero);
    const legendItems = perRow ? data.labels.length : data.datasets.length;
    const chart = new Chart(canvas, {
        type: TYPES[variant],
        data,
        plugins: variant === "horizontal-bar" ? [barValueLabels(font, formatValue)] : labelled ? [sliceLabels(font, formatValue)] : [],
        options: {
            animation: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? false : undefined,
            color: LABEL_COLOUR,
            indexAxis: variant === "horizontal-bar" ? "y" : "x",
            layout: {
                padding: ({ chart: c }) =>
                    variant === "horizontal-bar"
                        ? { right: widest(c, font, barValues(c, formatValue)) + 8 }
                        : labelled && c.$iaiSliceLabelRoom
                          ? { left: c.$iaiSliceLabelRoom, right: c.$iaiSliceLabelRoom, top: font.size * 2, bottom: font.size * 2 }
                          : 0,
            },
            scales: scalesFor(variant, font, formatValue),
            plugins: {
                legend: {
                    display: legendItems > 1,
                    // Hiding a series by click can't be done by keyboard or announced.
                    onClick: null,
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
                            `${perRow ? item.label : item.dataset.label}: ${formatValue(item.raw)}`,
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
    chart.$iaiFormat = requestedFormat;
    chart.$iaiShowNulls = !!requestedShowNulls;
    return chart;
}

/** Draw every chart on the page. Idempotent. */
export function initAllCharts() {
    document.querySelectorAll(`[data-module="${MODULE}"]`).forEach((el) => initChart(el));
}
