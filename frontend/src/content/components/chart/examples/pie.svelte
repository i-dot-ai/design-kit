<script>
  import { Chart } from "@i-dot-ai-npm/component-library-svelte";
</script>

<Chart
  variant="pie"
  title="How applications were submitted"
  data={{
    heading: "Channel",
    labels: ["Online", "Phone", "Post", "In person"],
    datasets: [
      {
        label: "Applications",
        data: [6200, 1450, 820, 330],
      },
    ],
  }}
/>
