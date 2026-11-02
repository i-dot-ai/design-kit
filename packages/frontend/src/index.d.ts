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
export const CHART_COLOURS: Readonly<Record<string, string>>;

/**
 * Draw a chart from its data table. Idempotent. Returns the Chart.js instance,
 * or undefined if the element has no table or chart type. Call `destroy()` on
 * it before redrawing.
 */
export function initChart(el: HTMLElement): import("chart.js").Chart | undefined;
