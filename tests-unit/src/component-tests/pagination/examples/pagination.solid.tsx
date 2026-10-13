/** @jsxImportSource solid-js */
import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import {
    Pagination,
    PaginationPrev,
    PaginationNext,
    PaginationList,
    PaginationItem,
} from "@i-dot-ai-npm/component-library-solid";
import type { PaginationData } from "../match-govuk-mappings.js";

export function renderPagination(data: PaginationData): JSX.Element {
    return (
        <Pagination block={data.block}>
            <Show when={data.previous}>
                <PaginationPrev href={data.previous!.href} block={data.block} labelText={data.previous!.labelText}>
                    {data.previous!.text}
                </PaginationPrev>
            </Show>
            <Show when={data.items.length > 0}>
                <PaginationList>
                    <For each={data.items}>
                        {(item) => (
                            <Show
                                when={!item.ellipsis}
                                fallback={<PaginationItem ellipsis />}
                            >
                                <PaginationItem href={item.href} current={item.current} ariaLabel={`Page ${item.number}`}>
                                    {item.number}
                                </PaginationItem>
                            </Show>
                        )}
                    </For>
                </PaginationList>
            </Show>
            <Show when={data.next}>
                <PaginationNext href={data.next!.href} block={data.block} labelText={data.next!.labelText}>
                    {data.next!.text}
                </PaginationNext>
            </Show>
        </Pagination>
    );
}
