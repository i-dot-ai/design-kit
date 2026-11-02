import { Chart } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
    <Chart
      variant="doughnut"
      title="Application outcomes"
      data={{
        heading: "Outcome",
        labels: ["Approved", "Refused", "Pending"],
        datasets: [{ label: "Applications", data: [5400, 1900, 1500] }],
      }}
    />
  );
}
