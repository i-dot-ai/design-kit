/** @jsxImportSource solid-js */
import { For, Show } from "solid-js";
import type { JSX } from "solid-js";
import {
    TaskList,
    TaskListItem,
    TaskListNameAndHint,
    TaskListLink,
    TaskListHint,
    TaskListStatus,
    Tag,
} from "@i-dot-ai-npm/component-library-solid";
import type { TaskItemData, TaskListData } from "../match-govuk-mappings.js";

function statusContent(item: TaskItemData): JSX.Element {
    if (item.statusTagText !== undefined) {
        return <Tag class={item.statusTagClasses}>{item.statusTagText}</Tag>;
    }
    return item.statusText;
}

export function renderTaskList(data: TaskListData): JSX.Element {
    return (
        <TaskList>
            <For each={data.items}>
                {(item) => {
                    const hintId = `${data.idPrefix}-${item.index}-hint`;
                    const statusId = `${data.idPrefix}-${item.index}-status`;
                    const describedBy = item.hint ? `${hintId} ${statusId}` : statusId;
                    return (
                        <TaskListItem withLink={item.href !== undefined} class={item.itemClasses}>
                            <TaskListNameAndHint>
                                <Show
                                    when={item.href !== undefined}
                                    fallback={<div>{item.title}</div>}
                                >
                                    <TaskListLink href={item.href} aria-describedby={describedBy}>
                                        {item.title}
                                    </TaskListLink>
                                </Show>
                                <Show when={item.hint}>
                                    <TaskListHint id={hintId}>{item.hint}</TaskListHint>
                                </Show>
                            </TaskListNameAndHint>
                            <TaskListStatus id={statusId} class={item.statusClasses}>{statusContent(item)}</TaskListStatus>
                        </TaskListItem>
                    );
                }}
            </For>
        </TaskList>
    );
}
