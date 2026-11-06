<script>
  // Test fixture: a button swaps the format, to check the chart redraws with it.
  import { Chart } from "@i-dot-ai-npm/component-library-svelte";

  const seconds = (value) => `${value}s`;
  const longSeconds = (value) => `${value}sec`;
  let format = $state(seconds);
</script>

<button type="button" class="govuk-button" data-testid="change-format" onclick={() => (format = longSeconds)}>Change format</button>
<Chart
  variant="line"
  title="Processing time per audio hour"
  {format}
  data={{
    heading: "Time",
    labels: ["09:00", "10:00"],
    datasets: [{ label: "Median", data: [744, 690] }],
  }}
/>
