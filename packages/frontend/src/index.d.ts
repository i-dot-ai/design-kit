// Type declarations for the i.AI Design System behaviour layer.

/**
 * Progressive enhancement for i.AI components. Call after govuk-frontend's
 * `initAll()`.
 */
export function initAllIAIDesignSystem(): void;

/** Open a modal dialog and lock background scroll. */
export function openModal(dialog: HTMLDialogElement): void;

/** Close a modal dialog and restore focus to the element that opened it. */
export function closeModal(dialog: HTMLDialogElement): void;

/** Enhance a single modal dialog element. Idempotent. */
export function initModal(dialog: HTMLDialogElement): void;

/** GOV.UK chart palette, by name (for example `"blue-shade-50"`). */
export const CHART_COLOURS: Readonly<Record<ChartColour, string>>;

/** A colour name from the GOV.UK chart palette. */
export type ChartColour =
    | "blue" | "blue-tint-25" | "blue-tint-50" | "blue-tint-80" | "blue-shade-10" | "blue-shade-25" | "blue-shade-50"
    | "magenta" | "magenta-tint-25" | "magenta-tint-50" | "magenta-tint-80" | "magenta-shade-25" | "magenta-shade-50"
    | "red" | "red-tint-25" | "red-tint-50" | "red-tint-80" | "red-shade-25" | "red-shade-50"
    | "green" | "green-tint-25" | "green-tint-50" | "green-tint-80" | "green-shade-25" | "green-shade-50"
    | "purple" | "purple-tint-25" | "purple-tint-50" | "purple-tint-80" | "purple-shade-25" | "purple-shade-50"
    | "teal" | "teal-tint-25" | "teal-tint-50" | "teal-tint-80" | "teal-shade-25" | "teal-shade-50"
    | "orange" | "orange-tint-25" | "orange-tint-50" | "orange-tint-80" | "orange-shade-25" | "orange-shade-50"
    | "black" | "black-tint-25" | "black-tint-50" | "black-tint-80";

export type ChartVariant = "line" | "area" | "bar" | "horizontal-bar" | "pie" | "doughnut";

export type ChartHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** Chart data, shaped like Chart.js's `data`. */
export type ChartData = {
    /** Header of the first table column, which names the labels (for example "Month"). */
    heading: string;
    labels: string[];
    datasets: {
        label: string;
        /** One colour, or one per label on pie and doughnut charts. */
        colour?: ChartColour | ChartColour[];
        /** Line and area charts only. If not set, series follow the order solid, dashed, dotted. */
        line?: "solid" | "dashed" | "dotted";
        /** One value per label. `null` leaves a gap (plotted as 0 with `showNullValuesAsZero`). */
        data: (number | null)[];
    }[];
};

/** Format a value for the chart's table: en-GB, `null` as "–", with optional `Intl.NumberFormat` options. */
export function formatChartValue(value: number | null, options?: Intl.NumberFormatOptions): string;

/** Options for `initChart`. */
export type InitChartOptions = {
    /**
     * Formats a value wherever the chart shows one: axis ticks, tooltips,
     * value labels and slice labels. Defaults to the chart's
     * `data-iai-chart-format` Intl.NumberFormat options, then en-GB number formatting.
     */
    format?: (value: number) => string;
    /** Plots `null` values as 0, keeping a line unbroken; the table still shows "–". Intended for line and area charts. */
    showNullValuesAsZero?: boolean;
};

/**
 * Draw a chart from its data table. Idempotent. Returns the Chart.js instance,
 * or undefined if the element has no table or chart type. Call `destroy()` on
 * it before redrawing.
 */
export function initChart(el: HTMLElement, options?: InitChartOptions): import("chart.js").Chart | undefined;
