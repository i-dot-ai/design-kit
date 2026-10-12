import type { ComponentMapping } from "../../matches-govuk-helpers/mapping.js";

// govuk `header` maps to our <GovukHeader> component (the GOV.UK crown/logotype
// header, distinct from the i.AI <Header> = generic-header).
//
// govuk options -> our props:
//   homepageUrl       -> homepageUrl (default "//gov.uk").
//   productName       -> productName (renders the product-name span).
//   containerClasses  -> containerClasses (replaces the default
//                        `govuk-width-container` on the inner container).
//   classes           -> class (handled by mapOptions/...rest).
//   attributes        -> spread onto the root (handled by mapOptions).
//
// The crown SVG logotype is fixed markup embedded in the component, so there is
// no text/children to map.
export const govukHeaderMapping: ComponentMapping = {
    transform(options, props) {
        if (typeof options.homepageUrl === "string") {
            props.homepageUrl = options.homepageUrl;
        }
        if (typeof options.productName === "string") {
            props.productName = options.productName;
        }
        if (typeof options.containerClasses === "string") {
            props.containerClasses = options.containerClasses;
        }
    },
};
