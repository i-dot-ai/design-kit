import { Chart } from "@i-dot-ai-npm/component-library-react";

export default function Example() {
  return (
    <Chart
      variant="pie"
      title="How applications were submitted"
      data={{
        heading: "Channel",
        labels: ["Online", "Phone", "Post", "In person"],
        datasets: [
          {
            label: "Applications",
            colour: ["blue-shade-50", "blue", "teal-tint-25", "magenta"],
            data: [6200, 1450, 820, 330],
          },
        ],
      }}
    />
  );
}
