<script>
  import { Chart } from "@i-dot-ai-npm/component-library-svelte";

  function formatProcessingTime(seconds) {
    const total = Math.round(seconds);
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const remainingSeconds = total % 60;
    if (hours) return `${hours}h ${minutes}m ${remainingSeconds}s`;
    if (minutes) return `${minutes}m ${remainingSeconds}s`;
    return `${remainingSeconds}s`;
  }
</script>

<Chart
  variant="line"
  title="Processing time per audio hour"
  description="How long it takes to process an hour of audio, by the hour it was submitted."
  format={formatProcessingTime}
  data={{
    heading: "Time",
    labels: ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"],
    datasets: [
      { label: "Median", data: [744, 690, 912, 1083, 856, 798] },
      { label: "Slowest 10%", data: [1530, 1402, 1975, 3723, 1760, null] },
    ],
  }}
/>
