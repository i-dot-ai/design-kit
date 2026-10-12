import { readFileSync } from "node:fs";
import { reduce, type Shape } from "../matches-govuk-helpers/reduce";
import { normalise } from "../matches-govuk-helpers/normalise";

export function expectedShape(htmlPath: string): Shape {
    const html = readFileSync(htmlPath, "utf8");
    return normalise(reduce(html));
}

export function renderedShape(html: string): Shape {
    return normalise(reduce(html));
}
