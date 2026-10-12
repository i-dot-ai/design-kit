import { loadFixtures } from "../../matches-govuk-helpers/oracle.js";

export type CellData = {
    text: string;
    numeric: boolean;
};

export type TableData = {
    name: string;
    caption?: string;
    captionSize?: "small" | "medium" | "large" | "xl";
    firstCellIsHeader: boolean;
    head?: CellData[];
    rows: CellData[][];
    expectedHtml: string;
};

type FixtureCell = { text?: string; format?: string };

type TableOptions = {
    caption?: string;
    captionClasses?: string;
    firstCellIsHeader?: boolean;
    head?: FixtureCell[];
    rows?: FixtureCell[][];
};

const CAPTION_SIZE: Record<string, "small" | "medium" | "large" | "xl"> = {
    "govuk-table__caption--s": "small",
    "govuk-table__caption--m": "medium",
    "govuk-table__caption--l": "large",
    "govuk-table__caption--xl": "xl",
};

function toCell(cell: FixtureCell): CellData {
    return { text: cell.text ?? "", numeric: cell.format === "numeric" };
}

/** Every non-hidden table fixture, as structured data. */
export function tableFixtures(): TableData[] {
    return loadFixtures("table").map((fixture) => {
        const options = fixture.options as TableOptions;
        const captionSizeClass = (options.captionClasses ?? "")
            .split(/\s+/)
            .find((c) => c in CAPTION_SIZE);
        return {
            name: fixture.name,
            caption: options.caption,
            captionSize: captionSizeClass ? CAPTION_SIZE[captionSizeClass] : undefined,
            firstCellIsHeader: options.firstCellIsHeader === true,
            head: options.head?.map(toCell),
            rows: (options.rows ?? []).map((row) => row.map(toCell)),
            expectedHtml: fixture.html,
        };
    });
}
