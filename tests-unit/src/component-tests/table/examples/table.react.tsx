import type { ReactNode } from "react";
import {
    Table,
    TableCaption,
    TableHead,
    TableBody,
    TableRow,
    TableHeader,
    TableCell,
} from "@i-dot-ai-npm/component-library-react";
import type { TableData } from "../match-govuk-mappings.js";

export function renderTable(data: TableData): ReactNode {
    return (
        <Table>
            {data.caption && <TableCaption size={data.captionSize}>{data.caption}</TableCaption>}
            {data.head && (
                <TableHead>
                    <TableRow>
                        {data.head.map((cell, i) => (
                            <TableHeader key={i} numeric={cell.numeric}>
                                {cell.text}
                            </TableHeader>
                        ))}
                    </TableRow>
                </TableHead>
            )}
            <TableBody>
                {data.rows.map((row, r) => (
                    <TableRow key={r}>
                        {row.map((cell, c) =>
                            data.firstCellIsHeader && c === 0 ? (
                                <TableHeader key={c} scope="row">
                                    {cell.text}
                                </TableHeader>
                            ) : (
                                <TableCell key={c} numeric={cell.numeric}>
                                    {cell.text}
                                </TableCell>
                            ),
                        )}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
