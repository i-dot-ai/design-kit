import { Chart } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
    <Chart
      variant="bar"
      title="Applications received by region"
      data={{
        heading: "Region",
        labels: ["North", "Midlands", "South", "Wales", "Scotland"],
        datasets: [
          { label: "2025", data: [2400, 1850, 3100, 950, 1300] },
          { label: "2026", data: [2650, 2100, 3350, 1020, 1410] },
        ],
      }}
    />
  );
}
