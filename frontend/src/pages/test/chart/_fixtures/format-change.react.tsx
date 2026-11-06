// Test fixture: one button swaps the format, to check the chart redraws with it. The other
// re-renders with a new inline format that shows the same text, to check the chart does not redraw.
import { useState } from "react";
import { Chart } from "@i-dot-ai-npm/component-library-react";

export default function FormatChange() {
  const [unit, setUnit] = useState("s");
  const [renders, setRenders] = useState(0);
  return (
    <>
      <button type="button" className="govuk-button" data-testid="change-format" onClick={() => setUnit("sec")}>
        Change format
      </button>
      <button type="button" className="govuk-button" data-testid="re-render" onClick={() => setRenders(renders + 1)}>
        Re-render {renders}
      </button>
      <Chart
        variant="line"
        title="Processing time per audio hour"
        format={(value) => `${value}${unit}`}
        data={{
          heading: "Time",
          labels: ["09:00", "10:00"],
          datasets: [{ label: "Median", data: [744, 690] }],
        }}
      />
    </>
  );
}
