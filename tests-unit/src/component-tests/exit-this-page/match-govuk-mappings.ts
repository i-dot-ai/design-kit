import type { ComponentMapping } from "../../matches-govuk-helpers/mapping.js";

// govuk options -> our <ExitThisPage> props:
//   redirectUrl   -> redirectUrl (the button href; defaults in-component).
//   id            -> id (passthrough).
//   classes       -> class (handled by mapOptions/...rest).
//   attributes    -> spread onto the root (handled by mapOptions).
//
// The default button content ("Emergency" visually-hidden + " Exit this page")
// is fixed markup in the component, so there is no text to map for the default
// fixture. (Custom text/html + i18n data-attrs are out of scope — no non-hidden
// fixture exercises them.)
export const exitThisPageMapping: ComponentMapping = {
    passthrough: ["id"],
    transform(options, props) {
        if (typeof options.redirectUrl === "string") {
            props.redirectUrl = options.redirectUrl;
        }
    },
};
