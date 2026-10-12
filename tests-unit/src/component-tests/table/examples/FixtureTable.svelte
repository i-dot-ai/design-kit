<script>
    import {
        Table,
        TableCaption,
        TableHead,
        TableBody,
        TableRow,
        TableHeader,
        TableCell,
    } from "@i-dot-ai-npm/component-library-svelte";

    let { caption, captionSize, firstCellIsHeader, head, rows } = $props();
</script>

<Table>
    {#if caption}
        <TableCaption size={captionSize}>{caption}</TableCaption>
    {/if}
    {#if head}
        <TableHead>
            <TableRow>
                {#each head as cell}
                    <TableHeader numeric={cell.numeric}>{cell.text}</TableHeader>
                {/each}
            </TableRow>
        </TableHead>
    {/if}
    <TableBody>
        {#each rows as row}
            <TableRow>
                {#each row as cell, c}
                    {#if firstCellIsHeader && c === 0}
                        <TableHeader scope="row">{cell.text}</TableHeader>
                    {:else}
                        <TableCell numeric={cell.numeric}>{cell.text}</TableCell>
                    {/if}
                {/each}
            </TableRow>
        {/each}
    </TableBody>
</Table>
