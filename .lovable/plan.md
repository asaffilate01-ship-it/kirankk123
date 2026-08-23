# Improve the financial charts

## Goal
Turn the Charts tab into a clearer investor view that works with the full 98-brand portfolio, remains readable on mobile, and makes performance, cash, and cost drivers easy to compare.

## Changes
- Replace the unreadable 98-series stacked area with a portfolio performance chart comparing monthly revenue, total costs, and net profit, including a zero reference line.
- Replace the crowded pie chart with a ranked horizontal bar chart for the top revenue-generating brands at the selected period end, grouping the remainder as “Other brands”.
- Improve cost composition with a cleaner stacked chart, a consistent semantic palette, better axis formatting, and reduced visual noise.
- Add a cash and funding chart showing cash balance, funding inflows, and dividend payout events across the forecast.
- Add compact period controls for 12, 24, or 36 months and summary figures above the charts so investors can scan the selected horizon quickly.
- Add polished custom tooltips, accessible legends, empty-state handling, responsive sizing, and German translations for new labels.

## Technical details
- Refactor `src/components/dashboard/ChartsPanel.tsx` into focused local chart helpers while continuing to use the existing Zustand financial model and Recharts.
- Use existing semantic chart/design tokens instead of introducing page-specific hardcoded UI colors.
- Add only the new chart labels to `src/lib/i18n-de.ts`.
- Verify the Charts tab at desktop and mobile widths, including period switching and tooltip/chart rendering.
