import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export type GovukFixture = {
    name: string;
    options: Record<string, unknown>;
    html: string;
    hidden: boolean;
    screenshot?: boolean;
};

type FixturesFile = {
    component: string;
    fixtures: GovukFixture[];
};

/** Names ending in a CSS pseudo-state — these are visual-regression only. */
const VISUAL_STATE = /\b(hover|active|focus)\s+state$/i;

function isVisualOnly(fixture: GovukFixture): boolean {
    return VISUAL_STATE.test(fixture.name);
}

/**
 * Load the govuk-frontend fixtures for a component, excluding fixtures that are
 * `hidden` or that only exist to capture a visual pseudo-state (hover/active/
 * focus). What remains is the set of "props -> expected HTML" shape cases.
 */
export function loadFixtures(component: string): GovukFixture[] {
    const file = require(
        `govuk-frontend/dist/govuk/components/${component}/fixtures.json`,
    ) as FixturesFile;

    return file.fixtures.filter(
        (f) => !f.hidden && !isVisualOnly(f),
    );
}
