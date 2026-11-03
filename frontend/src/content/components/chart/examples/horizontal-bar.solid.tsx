import { Chart } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
    <Chart
      variant="horizontal-bar"
      title="Applications received by region in 2026"
      data={{
        heading: "Region",
        labels: ["North", "Midlands", "South", "Wales", "Scotland"],
        datasets: [
          { label: "2026", data: [2650, 2100, 3350, 1020, 1410] },
        ],
      }}
    />
  );
}
