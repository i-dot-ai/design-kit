import type { ReactNode } from "react";

export const content: Record<string, ReactNode[]> = {
    "default": [
        <p className="govuk-body">
            We need to know your nationality so we can work out which elections
            you’re entitled to vote in. If you cannot provide your nationality,
            you’ll have to send copies of identity documents through the post.
        </p>,
        <ul className="govuk-list govuk-list--bullet"><li>Example item 2</li></ul>,
    ],
    "with additional descriptions": [
        <>
            <p className="govuk-body">
                We need to know your nationality so we can work out which
                elections you’re entitled to vote in. If you cannot provide your
                nationality, you’ll have to send copies of identity documents
                through the post.
            </p>
            <ul className="govuk-list govuk-list--bullet"><li>Example item 1</li></ul>
        </>,
        <ul className="govuk-list govuk-list--bullet"><li>Example item 2</li></ul>,
    ],
    "with long content and description": [
        <ul className="govuk-list govuk-list--bullet"><li>Example item 1</li></ul>,
        <ul className="govuk-list govuk-list--bullet"><li>Example item 2</li></ul>,
    ],
    "with all sections already open": [
        <ul className="govuk-list govuk-list--bullet"><li>Example item 1</li></ul>,
        <ul className="govuk-list govuk-list--bullet"><li>Example item 2</li></ul>,
    ],
};

export const summaryHtml: Record<string, Record<number, ReactNode>> = {
    "with additional descriptions": {
        1: <span className="govuk-!-font-weight-regular">Additional description (wrapped in span)</span>,
    },
    "with long content and description": {
        1: (
            <span className="govuk-!-font-weight-regular">
                Maecenas nec <abbr>est</abbr> sapien. Etiam varius luctus mauris non porttitor.{" "}
            </span>
        ),
    },
};
