import type { ReactNode } from "react";
import {
    TaskList,
    TaskListItem,
    TaskListNameAndHint,
    TaskListLink,
    TaskListHint,
    TaskListStatus,
    Tag,
} from "@i-dot-ai-npm/component-library-react";
import type { TaskItemData, TaskListData } from "../match-govuk-mappings.js";

function statusContent(item: TaskItemData): ReactNode {
    if (item.statusTagText !== undefined) {
        return <Tag class={item.statusTagClasses}>{item.statusTagText}</Tag>;
    }
    return item.statusText;
}

export function renderTaskList(data: TaskListData): ReactNode {
    return (
        <TaskList>
            {data.items.map((item) => {
                const hintId = `${data.idPrefix}-${item.index}-hint`;
                const statusId = `${data.idPrefix}-${item.index}-status`;
                const describedBy = item.hint ? `${hintId} ${statusId}` : statusId;
                return (
                    <TaskListItem key={item.index} withLink={item.href !== undefined} class={item.itemClasses}>
                        <TaskListNameAndHint>
                            {item.href !== undefined ? (
                                <TaskListLink href={item.href} aria-describedby={describedBy}>
                                    {item.title}
                                </TaskListLink>
                            ) : (
                                <div>{item.title}</div>
                            )}
                            {item.hint && <TaskListHint id={hintId}>{item.hint}</TaskListHint>}
                        </TaskListNameAndHint>
                        <TaskListStatus id={statusId} class={item.statusClasses}>{statusContent(item)}</TaskListStatus>
                    </TaskListItem>
                );
            })}
        </TaskList>
    );
}
