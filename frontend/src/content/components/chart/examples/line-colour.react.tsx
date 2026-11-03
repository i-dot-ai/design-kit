import { Chart } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <Chart
      variant="line"
      title="Applications received by month"
      data={{
        heading: "Month",
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          { label: "2024", colour: "blue-shade-50", data: [1200, 1350, 1500, 1420, 1600, 1650] },
          { label: "2025", colour: "blue", data: [1450, 1500, 1620, 1700, 1810, 1900] },
          { label: "2026", colour: "blue-tint-25", data: [1600, 1720, 1880, 1950, 2040, null] },
        ],
      }}
    />
  );
}
