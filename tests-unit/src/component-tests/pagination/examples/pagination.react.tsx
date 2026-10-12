import type { ReactNode } from "react";
import {
    Pagination,
    PaginationPrev,
    PaginationNext,
    PaginationList,
    PaginationItem,
} from "@i-dot-ai-npm/component-library-react";
import type { PaginationData } from "../match-govuk-mappings.js";

export function renderPagination(data: PaginationData): ReactNode {
    return (
        <Pagination block={data.block}>
            {data.previous && (
                <PaginationPrev href={data.previous.href} block={data.block} labelText={data.previous.labelText}>
                    {data.previous.text}
                </PaginationPrev>
            )}
            {data.items.length > 0 && (
                <PaginationList>
                    {data.items.map((item, i) =>
                        item.ellipsis ? (
                            <PaginationItem key={i} ellipsis />
                        ) : (
                            <PaginationItem
                                key={i}
                                href={item.href}
                                current={item.current}
                                ariaLabel={`Page ${item.number}`}
                            >
                                {item.number}
                            </PaginationItem>
                        ),
                    )}
                </PaginationList>
            )}
            {data.next && (
                <PaginationNext href={data.next.href} block={data.block} labelText={data.next.labelText}>
                    {data.next.text}
                </PaginationNext>
            )}
        </Pagination>
    );
}
