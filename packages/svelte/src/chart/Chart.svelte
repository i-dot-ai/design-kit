<script lang="ts">
    import { tick } from "svelte";
    import type { HTMLAttributes } from "svelte/elements";
    import { initChart, formatChartValue } from "@i-dot-ai-npm/component-library-frontend";
    import type { ChartData, ChartVariant } from "@i-dot-ai-npm/component-library-frontend";
    import Details from "../details/Details.svelte";
    import DetailsSummary from "../details/DetailsSummary.svelte";
    import DetailsText from "../details/DetailsText.svelte";
    import Table from "../table/Table.svelte";
    import TableCaption from "../table/TableCaption.svelte";
    import TableHead from "../table/TableHead.svelte";
    import TableBody from "../table/TableBody.svelte";
    import TableRow from "../table/TableRow.svelte";
    import TableHeader from "../table/TableHeader.svelte";
    import TableCell from "../table/TableCell.svelte";

    type Props = Omit<HTMLAttributes<HTMLDivElement>, "title" | "children"> & {
        variant: ChartVariant;
        /** Shown as the heading and the table caption, and used as the chart's accessible name. */
        title: string;
        data: ChartData;
        class?: string;
    };

    let { variant, title, data, class: className = "", ...rest }: Props = $props();

    let el = $state<HTMLDivElement>();

    let classes = $derived(["iai-chart", `iai-chart--${variant}`, className].filter(Boolean).join(" "));
    // Pie, doughnut and polar area colour each label from the first dataset's colour list.
    let sliceColours = $derived(Array.isArray(data.datasets[0]?.colour) ? data.datasets[0].colour : []);

    $effect(() => {
        // Track everything that ends up in the table, so the chart redraws when it changes.
        JSON.stringify([data, variant, title]);
        let chart: ReturnType<typeof initChart>;
        let cancelled = false;
        // Draw after Svelte has updated the table.
        tick().then(() => {
            if (!cancelled && el) chart = initChart(el);
        });
        return () => {
            cancelled = true;
            chart?.destroy();
        };
    });
</script>

<div bind:this={el} class={classes} data-module="iai-chart" {...rest}>
    <h3 class="govuk-heading-m">{title}</h3>
    <Details>
        <DetailsSummary>Show data</DetailsSummary>
        <DetailsText>
            <Table>
                <TableCaption size="small">{title}</TableCaption>
                <TableHead>
                    <TableRow>
                        <TableHeader>{data.heading}</TableHeader>
                        {#each data.datasets as dataset}
                            <TableHeader
                                numeric
                                data-iai-chart-colour={Array.isArray(dataset.colour) ? undefined : dataset.colour}
                                data-iai-chart-line={dataset.line === "solid" ? undefined : dataset.line}
                            >
                                {dataset.label}
                            </TableHeader>
                        {/each}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {#each data.labels as label, row}
                        <TableRow>
                            <TableHeader scope="row" data-iai-chart-colour={sliceColours[row]}>{label}</TableHeader>
                            {#each data.datasets as dataset}
                                <TableCell numeric>{formatChartValue(dataset.data[row] ?? null)}</TableCell>
                            {/each}
                        </TableRow>
                    {/each}
                </TableBody>
            </Table>
        </DetailsText>
    </Details>
</div>
