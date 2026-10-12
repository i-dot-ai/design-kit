import type { ReactNode } from "react";

// Re-authored value HTML per fixture + row index (React can't inject a raw HTML
// string as unwrapped content). Keyed as valueContent[fixtureName][rowIndex].

const contactInformation: ReactNode = (
    <>
        <p className="govuk-body">email@email.com</p>
        <p className="govuk-body">
            Address line 1<br /> Address line 2<br /> Address line 3<br /> Address line 4
            <br /> Address line 5
        </p>
    </>
);

const wikiLink =
    "https://cs.wikipedia.org/wiki/Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch";
const mailto =
    "mailto:webmaster@llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch.com";

export const valueContent: Record<string, Record<number, ReactNode>> = {
    default: { 2: contactInformation },
    "with actions": { 2: contactInformation },
    "no-border": { 2: contactInformation },
    "no-border on last row": { 2: contactInformation },
    extreme: {
        1: <a className="govuk-link" href={wikiLink}>{wikiLink}</a>,
        2: <a className="govuk-link" href={mailto}>webmaster@llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch.com</a>,
        3: <p className="govuk-body" style={{ whiteSpace: "nowrap" }}>michelle.longish.name@example.com</p>,
        4: (
            <>
                <p className="govuk-body">
                    Pneumonoultramicroscopicsilicovolcanoconiosis is a word coined by the president of
                    the National Puzzlers’ League as a synonym for the disease known as silicosis. It
                    is the longest word in the English language published in a dictionary, the Oxford
                    English Dictionary, which defines it as "an artificial long word said to mean a
                    lung disease caused by inhaling very fine ash and sand dust."
                </p>
                <p className="govuk-body">
                    Silicosis is a form of occupational lung disease caused by inhalation of
                    crystalline silica dust, and is marked by inflammation and scarring in the form of
                    nodular lesions in the upper lobes of the lungs. It is a type of pneumoconiosis.
                </p>
            </>
        ),
    },
    "as a summary card extreme": {
        1: <a className="govuk-link" href={wikiLink}>{wikiLink}</a>,
    },
};
