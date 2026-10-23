import { describe, it, expect } from "vitest";
import { renderHtml, esc, attrs } from "../../../render/web-components.js";
import { reduce } from "../../../matches-govuk-helpers/reduce.js";
import { normalise } from "../../../matches-govuk-helpers/normalise.js";
import { taskListFixtures, type TaskListData } from "../match-govuk-mappings.js";

const markup = (d: TaskListData) =>
    `<iai-task-list>${d.items
        .map((item) => {
            const hintId = `${d.idPrefix}-${item.index}-hint`;
            const statusId = `${d.idPrefix}-${item.index}-status`;
            const describedBy = item.hint ? `${hintId} ${statusId}` : statusId;
            const title = item.href !== undefined
                ? `<iai-task-list-link${attrs({ href: item.href, "aria-describedby": describedBy })}>${esc(item.title)}</iai-task-list-link>`
                : `<div>${esc(item.title)}</div>`;
            const hint = item.hint ? `<iai-task-list-hint id="${hintId}">${esc(item.hint)}</iai-task-list-hint>` : "";
            const status = item.statusTagText !== undefined
                ? `<iai-tag${attrs({ class: item.statusTagClasses })}>${esc(item.statusTagText)}</iai-tag>`
                : esc(item.statusText ?? "");
            return `<iai-task-list-item${attrs({ withlink: item.href !== undefined, class: item.itemClasses })}><iai-task-list-name-and-hint>${title}${hint}</iai-task-list-name-and-hint><iai-task-list-status${attrs({ id: statusId, class: item.statusClasses })}>${status}</iai-task-list-status></iai-task-list-item>`;
        })
        .join("")}</iai-task-list>`;

describe("Matches govuk fixture shape - TaskList", () => {
    for (const fixture of taskListFixtures()) {
        it(fixture.name, () => {
            const html = renderHtml(markup(fixture));
            expect(normalise(reduce(html))).toEqual(normalise(reduce(fixture.expectedHtml)));
        });
    }
});
