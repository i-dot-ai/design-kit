/** @jsxImportSource solid-js */
import type { JSX } from "solid-js";

export const content: Record<string, JSX.Element[]> = {
    "default": [
        <p class="govuk-body">
            We need to know your nationality so we can work out which elections
            you’re entitled to vote in. If you cannot provide your nationality,
            you’ll have to send copies of identity documents through the post.
        </p>,
        <ul class="govuk-list govuk-list--bullet"><li>Example item 2</li></ul>,
    ],
    "with additional descriptions": [
        <>
            <p class="govuk-body">
                We need to know your nationality so we can work out which
                elections you’re entitled to vote in. If you cannot provide your
                nationality, you’ll have to send copies of identity documents
                through the post.
            </p>
            <ul class="govuk-list govuk-list--bullet"><li>Example item 1</li></ul>
        </>,
        <ul class="govuk-list govuk-list--bullet"><li>Example item 2</li></ul>,
    ],
    "with long content and description": [
        <ul class="govuk-list govuk-list--bullet"><li>Example item 1</li></ul>,
        <ul class="govuk-list govuk-list--bullet"><li>Example item 2</li></ul>,
    ],
    "with all sections already open": [
        <ul class="govuk-list govuk-list--bullet"><li>Example item 1</li></ul>,
        <ul class="govuk-list govuk-list--bullet"><li>Example item 2</li></ul>,
    ],
};

export const summaryHtml: Record<string, Record<number, JSX.Element>> = {
    "with additional descriptions": {
        1: <span class="govuk-!-font-weight-regular">Additional description (wrapped in span)</span>,
    },
    "with long content and description": {
        1: (
            <span class="govuk-!-font-weight-regular">
                Maecenas nec <abbr>est</abbr> sapien. Etiam varius luctus mauris non porttitor.{" "}
            </span>
        ),
    },
};
