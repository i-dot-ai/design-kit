<script>
  import { Chart } from "@i-dot-ai-npm/component-library-svelte";
</script>

<Chart
  variant="stacked-bar"
  title="Applications received by region and channel"
  data={{
    heading: "Region",
    labels: ["North", "Midlands", "South", "Wales", "Scotland"],
    datasets: [
      { label: "Online", data: [1590, 1260, 2010, 612, 846] },
      { label: "Paper", data: [1060, 840, 1340, 408, 564] },
    ],
  }}
/>
