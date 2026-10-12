import type { ComponentMapping } from "../../matches-govuk-helpers/mapping.js";

// generic-header maps to our <Header> component (govuk-generic-header markup).
//
// govuk options -> our props:
//   logoText          -> children (text). See `textFrom` below.
//   url (default "/")  -> href.
//   containerClasses   -> containerClasses (replaces the default
//                         `govuk-width-container` on the inner container).
//   classes            -> class (handled by ...rest / class prop).
//   attributes         -> spread onto the root (handled by mapOptions).
//
// Not covered here (need the Tier-2 raw-HTML pattern, so those fixtures are
// filtered out in the test files):
//   logoHtml           -> raw HTML/SVG child (can't pass a string as markup
//                         through the Tier-1 render helpers).
export const genericHeaderMapping: ComponentMapping = {
    textFrom: ["logoText"],
    transform(options, props) {
        // govuk defaults the homepage link to "/" when no url is given.
        props.href = typeof options.url === "string" ? options.url : "/";
        if (typeof options.containerClasses === "string") {
            props.containerClasses = options.containerClasses;
        }
    },
};

// Fixtures our <Header> can express through the Tier-1 harness.
//
// Of the non-hidden govuk fixtures (default, with image logo, with text and
// image logo, full width) only `default` uses a plain-text logo. The other
// three carry raw HTML/SVG (logoHtml) which needs the Tier-2 pattern — note
// `full width` is now expressible structurally (containerClasses is supported)
// but still can't pass here because of its SVG child.
export const genericHeaderTextCases = new Set(["default"]);
