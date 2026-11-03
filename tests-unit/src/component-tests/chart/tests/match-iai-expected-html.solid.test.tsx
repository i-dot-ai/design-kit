import { describe, it, expect } from "vitest";
import { renderSolid } from "../../../render/solid";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import Line from "@content/components/chart/examples/line.solid";
import LineColour from "@content/components/chart/examples/line-colour.solid";
import LineStyle from "@content/components/chart/examples/line-style.solid";
import Area from "@content/components/chart/examples/area.solid";
import Bar from "@content/components/chart/examples/bar.solid";
import Pie from "@content/components/chart/examples/pie.solid";
import Doughnut from "@content/components/chart/examples/doughnut.solid";
import Radar from "@content/components/chart/examples/radar.solid";
import PolarArea from "@content/components/chart/examples/polar-area.solid";
import lineHtml from "@content/components/chart/examples/line.html?raw";
import lineColourHtml from "@content/components/chart/examples/line-colour.html?raw";
import lineStyleHtml from "@content/components/chart/examples/line-style.html?raw";
import areaHtml from "@content/components/chart/examples/area.html?raw";
import barHtml from "@content/components/chart/examples/bar.html?raw";
import pieHtml from "@content/components/chart/examples/pie.html?raw";
import doughnutHtml from "@content/components/chart/examples/doughnut.html?raw";
import radarHtml from "@content/components/chart/examples/radar.html?raw";
import polarAreaHtml from "@content/components/chart/examples/polar-area.html?raw";

const cases: [string, never, string][] = [
    ["line", Line, lineHtml],
    ["line-colour", LineColour, lineColourHtml],
    ["line-style", LineStyle, lineStyleHtml],
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
            expect(renderedShape(renderSolid(Example, {}))).toEqual(renderedShape(expectedHtml));
        });
    }
});
