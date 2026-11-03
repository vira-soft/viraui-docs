/**
 * Storybook-only fixtures derived from `@visx/visx` `MockData`
 * (https://visx.airbnb.tech/docs/mock-data). Not part of the public package.
 */
import { MockData } from '@visx/visx';

const { appleStock, browserUsage, cityTemperature, letterFrequency } = MockData;

const shortMonthFmt = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' });
const longMonthFmt = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' });
const shortDateFmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
const longDateFmt = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

const num = (value: unknown): number => (value == null ? 0 : Number(value));

/** ponytail: °F → demo magnitude so story yMax≈360 still fills; upgrade = data-driven domains. */
const cityDemo = (value: unknown): number => Math.round(num(value) * 4);

/** First row per calendar month, capped. */
const sampleByMonth = <T extends { date: string }>(rows: T[], count: number): T[] => {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const row of rows) {
    const d = new Date(row.date);
    if (!Number.isNaN(d.getTime())) {
      const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
      if (!seen.has(key)) {
        seen.add(key);
        out.push(row);
        if (out.length >= count) {
          break;
        }
      }
    }
  }
  return out;
};

const cityMonths = sampleByMonth(cityTemperature, 6);

export type MonthPoint = { month: string; value: number };
export type MultiPoint = { month: string; desktop: number; mobile: number };
export type StackPoint = { month: string; desktop: number; mobile: number; other: number };
export type CategoryPoint = { name: string; value: number };
export type SignedPoint = { month: string; value: number };
export type MonthDevicePoint = { month: string; desktop: number; mobile: number };
export type DenseDayPoint = { key: string; value: number; shortLabel: string; title: string };
export type DenseDualDayPoint = {
  key: string;
  shortLabel: string;
  title: string;
  mobile: number;
  desktop: number;
};
export type MobileDayPoint = { key: string; day: number; bpm: number; dateLabel: string };
export type ActivityPoint = { key: string; day: string; running: number; swimming: number };
export type XyPoint = { x: number; y: number };

/** New York monthly sample — single series. */
export const desktopData: MonthPoint[] = cityMonths.map((row) => ({
  month: shortMonthFmt.format(new Date(row.date)),
  value: cityDemo(row['New York']),
}));

/** NY + SF — clustered / dual series (Desktop / Mobile labels in stories). */
export const multiData: MultiPoint[] = cityMonths.map((row) => ({
  month: shortMonthFmt.format(new Date(row.date)),
  desktop: cityDemo(row['New York']),
  mobile: cityDemo(row['San Francisco']),
}));

/** NY + SF + Austin — stacked area. */
export const stackData: StackPoint[] = cityMonths.map((row) => ({
  month: shortMonthFmt.format(new Date(row.date)),
  desktop: cityDemo(row['New York']),
  mobile: cityDemo(row['San Francisco']),
  other: cityDemo(row.Austin),
}));

export const fullMonthData: MonthPoint[] = cityMonths.map((row) => ({
  month: longMonthFmt.format(new Date(row.date)),
  value: cityDemo(row['New York']),
}));

export const monthDeviceData: MonthDevicePoint[] = cityMonths.map((row) => ({
  month: longMonthFmt.format(new Date(row.date)),
  desktop: cityDemo(row['New York']),
  mobile: cityDemo(row['San Francisco']),
}));

export const monthDomain = desktopData.map((d) => d.month);

export const monthTitles: Record<string, string> = Object.fromEntries(
  cityMonths.map((row) => {
    const d = new Date(row.date);
    return [shortMonthFmt.format(d), longMonthFmt.format(d)];
  }),
);

/** Latest browserUsage row → pie / category bars. */
const browserRow = browserUsage[browserUsage.length - 1] ?? browserUsage[0];
if (browserRow == null) {
  throw new Error('MockData.browserUsage empty');
}
const browserPick: ReadonlyArray<readonly [keyof typeof browserRow & string, string]> = [
  ['Google Chrome', 'Chrome'],
  ['Safari', 'Safari'],
  ['Firefox', 'Firefox'],
  ['Microsoft Edge', 'Edge'],
  ['Other/Unknown', 'Other'],
];

export const browserData: CategoryPoint[] = browserPick.map(([key, name]) => ({
  name,
  /** ponytail: % → magnitude near prior demo weights; upgrade = raw share. */
  value: Math.round(num(browserRow[key]) * 5),
}));

/** MoM New York delta (demo-scaled) — signed bars. */
export const signedData: SignedPoint[] = cityMonths.map((row, i) => {
  const cur = cityDemo(row['New York']);
  const prev = i > 0 ? cityDemo(cityMonths[i - 1]?.['New York']) : cur;
  const delta = cur - prev;
  return {
    month: longMonthFmt.format(new Date(row.date)),
    value: delta === 0 ? cur - cityDemo(65) : delta,
  };
});

/** ~91 trading days from appleStock. */
const stockWindow = appleStock.slice(200, 291);

export const denseData: DenseDayPoint[] = stockWindow.map((row) => {
  const d = new Date(row.date);
  return {
    key: row.date.slice(0, 10),
    value: Math.max(4, Math.round(row.close)),
    shortLabel: shortDateFmt.format(d),
    title: longDateFmt.format(d),
  };
});

/** Dual series from cityTemperature consecutive days. */
const cityWindow = cityTemperature.slice(0, 91);

export const denseDualData: DenseDualDayPoint[] = cityWindow.map((row) => {
  const d = new Date(row.date);
  return {
    key: row.date,
    shortLabel: shortDateFmt.format(d),
    title: longDateFmt.format(d),
    mobile: cityDemo(row['San Francisco']),
    desktop: cityDemo(row['New York']),
  };
});

/** Last 30 apple closes remapped into a resting-HR-like band. */
const mobileWindow = appleStock.slice(-30);
const mobileCloses = mobileWindow.map((d) => d.close);
const mobileMin = Math.min(...mobileCloses);
const mobileMax = Math.max(...mobileCloses);
const mobileSpan = Math.max(1, mobileMax - mobileMin);

export const mobileData: MobileDayPoint[] = mobileWindow.map((row, i) => {
  const d = new Date(row.date);
  const day = i + 1;
  const bpm = Math.round(58 + ((row.close - mobileMin) / mobileSpan) * 40);
  return {
    key: row.date.slice(0, 10),
    day,
    bpm,
    dateLabel: longDateFmt.format(d),
  };
});

/** Six weekday stacks from city temps (scaled). */
const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: 'UTC' });
export const activityData: ActivityPoint[] = cityTemperature.slice(0, 6).map((row) => {
  const d = new Date(row.date);
  return {
    key: row.date,
    day: weekday.format(d),
    running: Math.round(num(row['New York']) * 8),
    swimming: Math.round(num(row['San Francisco']) * 8),
  };
});

/** Tiny XY demos — letterFrequency (A–F) has real peaks; Chrome/stock slices were near-flat. */
export const xySeries: XyPoint[] = letterFrequency.slice(0, 6).map((row, i) => ({
  x: i,
  y: Math.round(row.frequency * 1000),
}));

export const xySeriesShort: XyPoint[] = xySeries.slice(0, 5);
