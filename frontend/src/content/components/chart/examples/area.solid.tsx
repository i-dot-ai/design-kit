import { Chart } from "@i-dot-ai-npm/component-library-solid";

export default function Example() {
  return (
    <Chart
      variant="area"
      title="Applications by channel"
      data={{
        heading: "Month",
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          { label: "Online", data: [980, 1120, 1310, 1450, 1590, 1720] },
          { label: "Paper", data: [620, 600, 570, 500, 450, 410] },
        ],
      }}
    />
  );
}
