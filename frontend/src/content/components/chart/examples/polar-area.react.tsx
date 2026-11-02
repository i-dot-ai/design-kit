import { Chart } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <Chart
      variant="polar-area"
      title="Average processing time by application type"
      data={{
        heading: "Application type",
        labels: ["New", "Renewal", "Change of details", "Appeal"],
        datasets: [
          {
            label: "Days",
            colour: ["blue-shade-50", "blue", "teal-tint-25", "magenta"],
            data: [12, 5, 3, 28],
          },
        ],
      }}
    />
  );
}
