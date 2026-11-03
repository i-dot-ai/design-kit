# 15. Use Chart.js for charts

Date: 2026-11-03

## Status
Accepted

## Context

The design kit needs charts that work in plain HTML, Astro, React, Svelte, Solid and web components. They must be accessible and free for any team to use.

We looked at three options:

- **Chart.js.** Free and open source (MIT licence), actively maintained, and works in any framework.
- **The ONS chart component.** ONS's charts are very accessible, with keyboard navigation through data points. But they are built on Highcharts, which needs a paid licence for government use. Every team using our kit might need its own licence. Their HTML is also much more complicated than we need.
- **ApexCharts.** Has keyboard navigation and screen reader support built in. But it is only free for organisations with less than $2 million in annual budget, and putting it inside a kit that other teams use may need its most expensive licence.

We also looked at free alternatives such as Apache ECharts and Visa Chart Components. None was clearly more accessible, well maintained and usable across all six frameworks.

## Decision

We use Chart.js, and make the charts accessible through how we build them rather than relying on the library:

- Every chart includes its data as a table under "Show data", which works without JavaScript and with screen readers.
- Charts have a title and an optional description, which screen readers read with the chart.
- Pie and doughnut slices are labelled directly, and line and area charts use line styles, so colour is not the only way to tell series apart.
- Chart text follows the browser's font size, animation is skipped for reduced motion, and charts stay readable in high contrast mode.

## Consequences

- Teams can use charts for free, with no licence to manage.
- People cannot move through a chart's data points with the keyboard. The data table gives them the same information instead.
- Charts are drawn on a canvas, so screen readers, text spacing settings and browser translation cannot reach the text on the chart itself. The data table covers this.
- We support a small set of simple charts: line, area, bar, horizontal bar, pie and doughnut. Features such as annotations, confidence ranges and mixed chart types are not included.
- If teams need large data sets, more complex charts or keyboard navigation through data points, we should look at this decision again. With large data sets, the data table becomes too long to be a useful alternative to the chart. Highcharts, with a licence, is the most complete option and is what ONS uses.
