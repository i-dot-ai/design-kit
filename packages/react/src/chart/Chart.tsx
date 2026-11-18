import { useEffect, useRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { initChart, formatChartValue } from "@i-dot-ai-npm/component-library-frontend";
import type { ChartData, ChartGridLines, ChartHeadingLevel, ChartVariant } from "@i-dot-ai-npm/component-library-frontend";
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

type ChartProps = Omit<ComponentPropsWithoutRef<"div">, "children" | "title"> & {
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
    /** Plots `null` values as 0, keeping a line unbroken; the table still shows –. Intended for line and area charts. */
    showNullValuesAsZero?: boolean;
    /** Which grid lines to draw. Defaults to the lines along the value axis: horizontal on line, area and bar charts, vertical on horizontal-bar. */
    gridLines?: ChartGridLines;
    class?: string;
};

export default function Chart({ variant, title, description, headingLevel = 3, data, format, showNullValuesAsZero, gridLines, class: className, ...rest }: ChartProps) {
    const ref = useRef<HTMLDivElement>(null);
    const Heading = `h${headingLevel}` as const;
    const classes = ["iai-chart", `iai-chart--${variant}`, className ?? ""].filter(Boolean).join(" ");
    const { heading, labels, datasets } = data;
    // Pie and doughnut colour each label from the first dataset's colour list.
    const sliceColours = Array.isArray(datasets[0]?.colour) ? datasets[0].colour : [];
    // Callers often rebuild `data` each render; only redraw when its values change.
    const key = JSON.stringify(data);
    // `format` is often a new inline function each render, so redraw when what it shows changes, not the function.
    const formatKey = format ? JSON.stringify(datasets.map((dataset) => dataset.data.map((value) => (value == null ? null : format(value))))) : "";
    const formatRef = useRef(format);
    formatRef.current = format;

    useEffect(() => {
        const chart = ref.current
            ? initChart(ref.current, { format: formatRef.current, showNullValuesAsZero, gridLines })
            : undefined;
        return () => chart?.destroy();
    }, [key, formatKey, variant, title, description, headingLevel, showNullValuesAsZero, gridLines]);

    return (
        <div ref={ref} className={classes} data-module="iai-chart" data-iai-chart-grid-lines={gridLines} {...rest}>
            <Heading className="govuk-heading-m">{title}</Heading>
            {description && <p className="govuk-body iai-chart__description">{description}</p>}
            <Details>
                <DetailsSummary>Show data<span className="govuk-visually-hidden"> for {title}</span></DetailsSummary>
                <DetailsText>
                    <Table>
                        <TableCaption size="small">{title}</TableCaption>
                        <TableHead>
                            <TableRow>
                                <TableHeader>{heading}</TableHeader>
                                {datasets.map((dataset, i) => (
                                    <TableHeader
                                        key={i}
                                        numeric
                                        data-iai-chart-colour={Array.isArray(dataset.colour) ? undefined : dataset.colour}
                                        data-iai-chart-line={dataset.line}
                                    >
                                        {dataset.label}
                                    </TableHeader>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {labels.map((label, row) => (
                                <TableRow key={row}>
                                    <TableHeader scope="row" data-iai-chart-colour={sliceColours[row]}>
                                        {label}
                                    </TableHeader>
                                    {datasets.map((dataset, i) => {
                                        const value = dataset.data[row];
                                        return (
                                            <TableCell key={i} numeric data-value={format && value != null ? value : undefined}>
                                                {value == null ? "–" : format ? format(value) : formatChartValue(value)}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DetailsText>
            </Details>
        </div>
    );
}
