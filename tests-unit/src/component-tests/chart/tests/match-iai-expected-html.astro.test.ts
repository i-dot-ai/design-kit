import { describe, it, expect } from "vitest";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { renderAstro } from "../../../render/astro";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import Line from "@content/components/chart/examples/line.astro";
import LineColour from "@content/components/chart/examples/line-colour.astro";
import LineStyle from "@content/components/chart/examples/line-style.astro";
import Area from "@content/components/chart/examples/area.astro";
import Bar from "@content/components/chart/examples/bar.astro";
import HorizontalBar from "@content/components/chart/examples/horizontal-bar.astro";
import BarDescription from "@content/components/chart/examples/bar-description.astro";
import Pie from "@content/components/chart/examples/pie.astro";
import Doughnut from "@content/components/chart/examples/doughnut.astro";
import lineHtml from "@content/components/chart/examples/line.html?raw";
import lineColourHtml from "@content/components/chart/examples/line-colour.html?raw";
import lineStyleHtml from "@content/components/chart/examples/line-style.html?raw";
import areaHtml from "@content/components/chart/examples/area.html?raw";
import barHtml from "@content/components/chart/examples/bar.html?raw";
import horizontalBarHtml from "@content/components/chart/examples/horizontal-bar.html?raw";
import barDescriptionHtml from "@content/components/chart/examples/bar-description.html?raw";
import pieHtml from "@content/components/chart/examples/pie.html?raw";
import doughnutHtml from "@content/components/chart/examples/doughnut.html?raw";

const cases: [string, AstroComponentFactory, string][] = [
    ["line", Line, lineHtml],
    ["line-colour", LineColour, lineColourHtml],
    ["line-style", LineStyle, lineStyleHtml],
    ["area", Area, areaHtml],
    ["bar", Bar, barHtml],
    ["horizontal-bar", HorizontalBar, horizontalBarHtml],
    ["bar-description", BarDescription, barDescriptionHtml],
    ["pie", Pie, pieHtml],
    ["doughnut", Doughnut, doughnutHtml],
];

describe("Matches i.AI expected HTML - Chart", () => {
    for (const [variant, Example, expectedHtml] of cases) {
        it(variant, async () => {
            expect(renderedShape(await renderAstro(Example, {}))).toEqual(renderedShape(expectedHtml));
        });
    }
});
