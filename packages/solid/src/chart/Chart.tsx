/** @jsxImportSource solid-js */

import { createEffect, For, onCleanup, Show, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { JSX } from "solid-js";
import { initChart, formatChartValue } from "@i-dot-ai-npm/component-library-frontend";
import type { ChartData, ChartHeadingLevel, ChartVariant } from "@i-dot-ai-npm/component-library-frontend";
import Details from "../details/Details";
import DetailsSummary from "../details/DetailsSummary";
import DetailsText from "../details/DetailsText";
import Table from "../table/Table";
import TableCaption from "../table/TableCaption";
import TableHead from "../table/TableHead";
import TableBody from "../table/TableBody";
import TableRow from "../table/TableRow";
import TableHeader from "../table/TableHeader";
import TableCell from "../table/TableCell";

type ChartProps = Omit<JSX.IntrinsicElements["div"], "children" | "title"> & {
    variant: ChartVariant;
    /** Shown as the heading and the table caption, and used as the chart's accessible name. */
    title: string;
    /** A short summary of what the chart shows. Shown under the title and read out with the chart. */
    description?: string;
    /** The title's heading level. Defaults to 3. */
    headingLevel?: ChartHeadingLevel;
    data: ChartData;
    /** Formats values in the table, on the axes, in tooltips and in value labels. Defaults to en-GB number formatting. */
    format?: (value: number) => string;
    class?: string;
};

export default function Chart(props: ChartProps) {
    const [local, rest] = splitProps(props, ["variant", "title", "description", "headingLevel", "data", "format", "class"]);
    let el: HTMLDivElement | undefined;

    const classes = () =>
        ["iai-chart", `iai-chart--${local.variant}`, local.class ?? ""].filter(Boolean).join(" ");
    // Pie and doughnut colour each label from the first dataset's colour list.
    const sliceColours = () => {
        const colour = local.data.datasets[0]?.colour;
        return Array.isArray(colour) ? colour : [];
    };

    createEffect(() => {
        // Track everything that ends up in the table, so the chart redraws when it changes.
        JSON.stringify([local.data, local.variant, local.title, local.description]);
        // Read before the delay below, which Solid does not track, so a new format redraws the chart.
        const format = local.format;
        let chart: ReturnType<typeof initChart>;
        let cancelled = false;
        // Draw after Solid has updated the table.
        queueMicrotask(() => {
            if (!cancelled && el) chart = initChart(el, { format });
        });
        onCleanup(() => {
            cancelled = true;
            chart?.destroy();
        });
    });

    return (
        <div ref={el} class={classes()} data-module="iai-chart" {...rest}>
            <Dynamic component={`h${local.headingLevel ?? 3}`} class="govuk-heading-m">
                {local.title}
            </Dynamic>
            <Show when={local.description}>
                <p class="govuk-body iai-chart__description">{local.description}</p>
            </Show>
            <Details>
                <DetailsSummary>Show data<span class="govuk-visually-hidden"> for {local.title}</span></DetailsSummary>
                <DetailsText>
                    <Table>
                        <TableCaption size="small">{local.title}</TableCaption>
                        <TableHead>
                            <TableRow>
                                <TableHeader>{local.data.heading}</TableHeader>
                                <For each={local.data.datasets}>
                                    {(dataset) => (
                                        <TableHeader
                                            numeric
                                            data-iai-chart-colour={Array.isArray(dataset.colour) ? undefined : dataset.colour}
                                            data-iai-chart-line={dataset.line}
                                        >
                                            {dataset.label}
                                        </TableHeader>
                                    )}
                                </For>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <For each={local.data.labels}>
                                {(label, row) => (
                                    <TableRow>
                                        <TableHeader scope="row" data-iai-chart-colour={sliceColours()[row()]}>
                                            {label}
                                        </TableHeader>
                                        <For each={local.data.datasets}>
                                            {(dataset) => {
                                                const value = () => dataset.data[row()];
                                                return (
                                                    <TableCell numeric data-value={local.format && value() != null ? value() : undefined}>
                                                        {value() == null ? "–" : local.format ? local.format(value()!) : formatChartValue(value()!)}
                                                    </TableCell>
                                                );
                                            }}
                                        </For>
                                    </TableRow>
                                )}
                            </For>
                        </TableBody>
                    </Table>
                </DetailsText>
            </Details>
        </div>
    );
}
