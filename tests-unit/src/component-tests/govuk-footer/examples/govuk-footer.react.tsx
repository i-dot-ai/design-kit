import type { ReactNode } from "react";
import { GovukFooter } from "@i-dot-ai-npm/component-library-react";
import type { FooterData } from "../match-govuk-mappings.js";

// Raw-HTML fixture fields re-authored as elements (see accordion pattern).
const metaContent: Record<string, ReactNode> = {
    "with meta links and meta content": (
        <>
            Built by the <a href="#" className="govuk-footer__link">Department of Magical Law Enforcement</a>
        </>
    ),
    "Full GDS example": (
        <>
            Built by the <a className="govuk-footer__link" href="#">Government Digital Service</a>
        </>
    ),
};

const licenceContent: Record<string, ReactNode> = {
    "with custom HTML content licence and copyright notice": (
        <>
            Mae’r holl gynnwys ar gael dan{" "}
            <a
                className="govuk-footer__link"
                href="https://www.nationalarchives.gov.uk/doc/open-government-licence-cymraeg/version/3/"
                rel="license"
            >
                Drwydded y Llywodraeth Agored v3.0
            </a>
            , ac eithrio lle nodir yn wahanol
        </>
    ),
};

const copyrightContent: Record<string, ReactNode> = {
    "with custom HTML content licence and copyright notice": <span>Hawlfraint y Goron</span>,
};

export function renderFooter(data: FooterData): ReactNode {
    const meta = data.meta
        ? {
              ...data.meta,
              content: data.meta.html ? metaContent[data.name] : undefined,
          }
        : undefined;

    const contentLicence =
        data.contentLicence === null
            ? null
            : data.contentLicence
              ? {
                    ...data.contentLicence,
                    content: data.contentLicence.html ? licenceContent[data.name] : undefined,
                }
              : undefined;

    const copyright = data.copyright
        ? {
              ...data.copyright,
              content: data.copyright.html ? copyrightContent[data.name] : undefined,
          }
        : undefined;

    return (
        <GovukFooter
            navigation={data.navigation}
            meta={meta}
            contentLicence={contentLicence}
            copyright={copyright}
        />
    );
}
