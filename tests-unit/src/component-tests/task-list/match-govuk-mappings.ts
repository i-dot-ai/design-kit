import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type TaskItemData = {
    /** 1-based position in the original items array (falsy items are skipped
     *  but still consume an index — matches govuk's loop.index). */
    index: number;
    title: string;
    href?: string;
    itemClasses?: string;
    hint?: string;
    statusText?: string;
    statusClasses?: string;
    statusTagText?: string;
    statusTagClasses?: string;
};

export type TaskListData = {
    name: string;
    idPrefix: string;
    items: TaskItemData[];
    expectedHtml: string;
};

type FixtureItem =
    | {
          title?: { text?: string; classes?: string };
          href?: string;
          classes?: string;
          hint?: { text?: string };
          status?: {
              text?: string;
              classes?: string;
              tag?: { text?: string; classes?: string };
          };
      }
    | null
    | false
    | "";

type TaskListOptions = {
    idPrefix?: string;
    items?: FixtureItem[];
};

/** Every non-hidden task-list fixture, as structured data. */
export function taskListFixtures(): TaskListData[] {
    return loadFixtures("task-list").map((fixture) => {
        const options = fixture.options as TaskListOptions;
        const items: TaskItemData[] = [];
        (options.items ?? []).forEach((item, i) => {
            if (!item) return; // falsy items skipped, but index still advances
            items.push({
                index: i + 1,
                title: item.title?.text ?? "",
                href: item.href,
                itemClasses: item.classes,
                hint: item.hint?.text,
                statusText: item.status?.tag ? undefined : item.status?.text,
                statusClasses: item.status?.classes,
                statusTagText: item.status?.tag?.text,
                statusTagClasses: item.status?.tag?.classes,
            });
        });
        return {
            name: fixture.name,
            idPrefix: options.idPrefix ?? "task-list",
            items,
            expectedHtml: fixture.html,
        };
    });
}
