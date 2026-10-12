<script>
    import {
        TaskList,
        TaskListItem,
        TaskListNameAndHint,
        TaskListLink,
        TaskListHint,
        TaskListStatus,
        Tag,
    } from "@i-dot-ai-npm/component-library-svelte";

    let { idPrefix, items } = $props();
</script>

<TaskList>
    {#each items as item}
        {@const hintId = `${idPrefix}-${item.index}-hint`}
        {@const statusId = `${idPrefix}-${item.index}-status`}
        {@const describedBy = item.hint ? `${hintId} ${statusId}` : statusId}
        <TaskListItem withLink={item.href !== undefined} class={item.itemClasses}>
            <TaskListNameAndHint>
                {#if item.href !== undefined}
                    <TaskListLink href={item.href} aria-describedby={describedBy}>{item.title}</TaskListLink>
                {:else}
                    <div>{item.title}</div>
                {/if}
                {#if item.hint}
                    <TaskListHint id={hintId}>{item.hint}</TaskListHint>
                {/if}
            </TaskListNameAndHint>
            <TaskListStatus id={statusId} class={item.statusClasses}>
                {#if item.statusTagText !== undefined}<Tag class={item.statusTagClasses}>{item.statusTagText}</Tag>{:else}{item.statusText}{/if}
            </TaskListStatus>
        </TaskListItem>
    {/each}
</TaskList>
