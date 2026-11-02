import { describe, it, expect } from "vitest";
import { renderSvelte } from "../../../render/svelte";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import Line from "@content/components/chart/examples/line.svelte";
import Area from "@content/components/chart/examples/area.svelte";
import Bar from "@content/components/chart/examples/bar.svelte";
import Pie from "@content/components/chart/examples/pie.svelte";
import Doughnut from "@content/components/chart/examples/doughnut.svelte";
import Radar from "@content/components/chart/examples/radar.svelte";
import PolarArea from "@content/components/chart/examples/polar-area.svelte";
import lineHtml from "@content/components/chart/examples/line.html?raw";
import areaHtml from "@content/components/chart/examples/area.html?raw";
import barHtml from "@content/components/chart/examples/bar.html?raw";
import pieHtml from "@content/components/chart/examples/pie.html?raw";
import doughnutHtml from "@content/components/chart/examples/doughnut.html?raw";
import radarHtml from "@content/components/chart/examples/radar.html?raw";
import polarAreaHtml from "@content/components/chart/examples/polar-area.html?raw";

const cases: [string, never, string][] = [
    ["line", Line, lineHtml],
    ["area", Area, areaHtml],
    ["bar", Bar, barHtml],
    ["pie", Pie, pieHtml],
    ["doughnut", Doughnut, doughnutHtml],
    ["radar", Radar, radarHtml],
    ["polar-area", PolarArea, polarAreaHtml],
];

describe("Matches i.AI expected HTML - Chart", () => {
    for (const [variant, Example, expectedHtml] of cases) {
        it(variant, () => {
            expect(renderedShape(renderSvelte(Example, {}))).toEqual(renderedShape(expectedHtml));
        });
    }
});
