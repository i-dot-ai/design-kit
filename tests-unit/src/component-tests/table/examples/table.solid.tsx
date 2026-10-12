/** @jsxImportSource solid-js */
import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import {
    Table,
    TableCaption,
    TableHead,
    TableBody,
    TableRow,
    TableHeader,
    TableCell,
} from "@i-dot-ai-npm/component-library-solid";
import type { TableData } from "../match-govuk-mappings.js";

export function renderTable(data: TableData): JSX.Element {
    return (
        <Table>
            <Show when={data.caption}>
                <TableCaption size={data.captionSize}>{data.caption}</TableCaption>
            </Show>
            <Show when={data.head}>
                <TableHead>
                    <TableRow>
                        <For each={data.head}>
                            {(cell) => <TableHeader numeric={cell.numeric}>{cell.text}</TableHeader>}
                        </For>
                    </TableRow>
                </TableHead>
            </Show>
            <TableBody>
                <For each={data.rows}>
                    {(row) => (
                        <TableRow>
                            <For each={row}>
                                {(cell, c) => (
                                    <Show
                                        when={data.firstCellIsHeader && c() === 0}
                                        fallback={<TableCell numeric={cell.numeric}>{cell.text}</TableCell>}
                                    >
                                        <TableHeader scope="row">{cell.text}</TableHeader>
                                    </Show>
                                )}
                            </For>
                        </TableRow>
                    )}
                </For>
            </TableBody>
        </Table>
    );
}
