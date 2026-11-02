/** @jsxImportSource solid-js */

import { createEffect, For, onCleanup, splitProps } from "solid-js";
import type { JSX } from "solid-js";
import { initChart, formatChartValue } from "@i-dot-ai-npm/component-library-frontend";
import type { ChartData, ChartVariant } from "@i-dot-ai-npm/component-library-frontend";
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
    data: ChartData;
    class?: string;
};

export default function Chart(props: ChartProps) {
    const [local, rest] = splitProps(props, ["variant", "title", "data", "class"]);
    let el: HTMLDivElement | undefined;

    const classes = () =>
        ["iai-chart", `iai-chart--${local.variant}`, local.class ?? ""].filter(Boolean).join(" ");
    // Pie, doughnut and polar area colour each label from the first dataset's colour list.
    const sliceColours = () => {
        const colour = local.data.datasets[0]?.colour;
        return Array.isArray(colour) ? colour : [];
    };

    createEffect(() => {
        // Track everything that ends up in the table, so the chart redraws when it changes.
        JSON.stringify([local.data, local.variant, local.title]);
        let chart: ReturnType<typeof initChart>;
        let cancelled = false;
        // Draw after Solid has updated the table.
        queueMicrotask(() => {
            if (!cancelled && el) chart = initChart(el);
        });
        onCleanup(() => {
            cancelled = true;
            chart?.destroy();
        });
    });

    return (
        <div ref={el} class={classes()} data-module="iai-chart" {...rest}>
            <h3 class="govuk-heading-m">{local.title}</h3>
            <Details>
                <DetailsSummary>Show data</DetailsSummary>
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
                                            data-iai-chart-line={dataset.line === "solid" ? undefined : dataset.line}
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
                                            {(dataset) => (
                                                <TableCell numeric>
                                                    {formatChartValue(dataset.data[row()] ?? null)}
                                                </TableCell>
                                            )}
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
