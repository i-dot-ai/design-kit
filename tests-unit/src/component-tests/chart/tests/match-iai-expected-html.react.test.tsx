import { describe, it, expect } from "vitest";
import type { ComponentType } from "react";
import { renderReact } from "../../../render/react";
import { renderedShape } from "../../../match-iai-expected-html-helpers/expected";
import Line from "@content/components/chart/examples/line.react";
import LineFormat from "@content/components/chart/examples/line-format-function.react";
import LineColour from "@content/components/chart/examples/line-colour.react";
import LineStyle from "@content/components/chart/examples/line-style.react";
import Area from "@content/components/chart/examples/area.react";
import Bar from "@content/components/chart/examples/bar.react";
import HorizontalBar from "@content/components/chart/examples/horizontal-bar.react";
import BarDescription from "@content/components/chart/examples/bar-description.react";
import Pie from "@content/components/chart/examples/pie.react";
import Doughnut from "@content/components/chart/examples/doughnut.react";
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

const cases: [string, ComponentType<Record<string, unknown>>, string][] = [
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
            expect(renderedShape(renderReact(Example, {}))).toEqual(renderedShape(expectedHtml));
        });
    }
});
