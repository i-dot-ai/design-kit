import { reduce, type Shape } from "../matches-govuk-helpers/reduce";
import { normalise } from "../matches-govuk-helpers/normalise";

export function renderedShape(html: string): Shape {
    return normalise(reduce(html));
}
