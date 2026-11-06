/** @jsxImportSource solid-js */
// Test fixture: a button swaps the format, to check the chart redraws with it.
import { createSignal } from "solid-js";
import { Chart } from "@i-dot-ai-npm/component-library-solid";

const seconds = (value: number) => `${value}s`;
const longSeconds = (value: number) => `${value}sec`;

export default function FormatChange() {
  const [format, setFormat] = createSignal(seconds);
  return (
    <>
      <button type="button" class="govuk-button" data-testid="change-format" onClick={() => setFormat(() => longSeconds)}>
        Change format
      </button>
      <Chart
        variant="line"
        title="Processing time per audio hour"
        format={format()}
        data={{
          heading: "Time",
          labels: ["09:00", "10:00"],
          datasets: [{ label: "Median", data: [744, 690] }],
        }}
      />
    </>
  );
}
