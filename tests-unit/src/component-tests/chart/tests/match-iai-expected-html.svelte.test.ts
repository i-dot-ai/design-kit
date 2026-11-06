import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import Line from "@content/components/chart/examples/line.svelte";
import LineFormat from "@content/components/chart/examples/line-format-function.svelte";
import LineColour from "@content/components/chart/examples/line-colour.svelte";
import LineStyle from "@content/components/chart/examples/line-style.svelte";
import Area from "@content/components/chart/examples/area.svelte";
import Bar from "@content/components/chart/examples/bar.svelte";
import HorizontalBar from "@content/components/chart/examples/horizontal-bar.svelte";
import BarDescription from "@content/components/chart/examples/bar-description.svelte";
import Pie from "@content/components/chart/examples/pie.svelte";
import Doughnut from "@content/components/chart/examples/doughnut.svelte";
import lineHtml from "@content/components/chart/examples/line.html?raw";
import lineFormatHtml from "@content/components/chart/examples/line-format-function.html?raw";
import lineColourHtml from "@content/components/chart/examples/line-colour.html?raw";
import lineStyleHtml from "@content/components/chart/examples/line-style.html?raw";
import areaHtml from "@content/components/chart/examples/area.html?raw";
import barHtml from "@content/components/chart/examples/bar.html?raw";
import horizontalBarHtml from "@content/components/chart/examples/horizontal-bar.html?raw";
import barDescriptionHtml from "@content/components/chart/examples/bar-description.html?raw";
import pieHtml from "@content/components/chart/examples/pie.html?raw";
import doughnutHtml from "@content/components/chart/examples/doughnut.html?raw";

const cases: [string, never, string][] = [
    ["line", Line, lineHtml],
    ["line-format-function", LineFormat, lineFormatHtml],
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
        it(variant, () => {
            expect(renderedShape(renderSvelte(Example, {}))).toEqual(renderedShape(expectedHtml));
        });
    }
});
