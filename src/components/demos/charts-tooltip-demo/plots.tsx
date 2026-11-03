"use client";

import {
  Bicycle,
  Flame,
  ForkKnife,
  Heart,
  Moon,
  PersonSimpleSwim,
  PersonSimpleWalk,
} from '@phosphor-icons/react';
import * as React from 'react';

import {
  AreaClosed,
  AreaStack,
  AxisBottom,
  Bar,
  BarRounded,
  Circle,
  Group,
  LinePath,
  Pie,
  TooltipWithBounds,
  curveMonotoneX,
  defaultStyles,
  localPoint,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  scalePoint,
  useTooltip,
} from '@viraui/charts';
import { mutedLabel } from '../../../lib/chart-tokens';
import { thinDomainTicks } from '../../../lib/chart-ticks';
import {
  activityData,
  denseData,
  mobileData,
  type ActivityPoint,
  type DenseDayPoint,
  type MobileDayPoint,
} from '../../../lib/chart-story-data';

type TooltipIndicator = 'dot' | 'line' | 'none' | 'icon';

type TooltipRow = {
  key: string;
  label: string;
  value: number;
  color: string;
  icon?: React.ReactNode;
};

type CardTooltipBodyProps = {
  title?: string;
  rows: ReadonlyArray<TooltipRow>;
  indicator?: TooltipIndicator;
  formatValue?: (value: number) => React.ReactNode;
  showTotal?: boolean;
};

type SeedIndexProps = {
  defaultOpenIndex?: number;
};

const width = 560;
const height = 320;
const margin = { top: 28, right: 24, bottom: 40, left: 48 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const stackGap = 3;

const moveColor = 'var(--highlight-salmon)';
const exerciseColor = 'var(--highlight-green)';
const heartColor = 'var(--highlight-red)';
const sleepColor = 'var(--highlight-indigo)';
const stepsColor = 'var(--highlight-cyan)';
const energyColor = 'var(--highlight-yellow)';
const distanceColor = 'var(--highlight-magenta)';
const proteinColor = 'var(--color-red-30)';
const carbsColor = 'var(--color-cyan-30)';
const fatColor = 'var(--color-yellow-30)';

/** Last 14 resting-HR samples — iOS Health–style line host. */
const heartSeries = mobileData.slice(-14);
const heartDomain = heartSeries.map((d) => d.key);

/** Seven day step counts from dense closes (demo magnitude). */
const stepsSeries: DenseDayPoint[] = denseData.slice(-7).map((d) => ({
  ...d,
  value: Math.round(d.value * 12),
}));
const stepsDomain = stepsSeries.map((d) => d.key);

/** Weeknight sleep hours — local fixture for sleep bars. */
const sleepSeries = [
  { key: '2024-01-01', day: 'Mon', hours: 6.4 },
  { key: '2024-01-02', day: 'Tue', hours: 7.1 },
  { key: '2024-01-03', day: 'Wed', hours: 5.8 },
  { key: '2024-01-04', day: 'Thu', hours: 7.6 },
  { key: '2024-01-05', day: 'Fri', hours: 6.9 },
  { key: '2024-01-06', day: 'Sat', hours: 8.2 },
  { key: '2024-01-07', day: 'Sun', hours: 7.4 },
] as const;
const sleepDomain = sleepSeries.map((d) => d.day);

/** Active Energy — weekday Move kcal from activity running series. */
const energySeries = activityData.map((d) => ({
  key: d.key,
  day: d.day,
  kcal: d.running,
}));
const energyDomain = energySeries.map((d) => d.day);

/** Outdoor walk distance (km) — formatter host, distinct from heart-rate line. */
const distanceSeries = mobileData.slice(-10).map((d, i) => ({
  key: d.key,
  dateLabel: d.dateLabel,
  km: Math.round((2.4 + (d.bpm - 58) / 20 + i * 0.08) * 10) / 10,
}));
const distanceDomain = distanceSeries.map((d) => d.key);

/** Workout mix — pie host for icon tooltips. */
const workoutSlices = [
  {
    key: 'walk',
    label: 'Walk',
    value: 42,
    color: 'var(--highlight-cyan)',
    icon: <PersonSimpleWalk aria-hidden size={14} />,
  },
  {
    key: 'cycle',
    label: 'Cycle',
    value: 28,
    color: 'var(--highlight-acid)',
    icon: <Bicycle aria-hidden size={14} />,
  },
  {
    key: 'swim',
    label: 'Swim',
    value: 18,
    color: 'var(--highlight-blue)',
    icon: <PersonSimpleSwim aria-hidden size={14} />,
  },
] as const;

/** Daily macros (g) — stacked-area host for advanced total. */
type MacroPoint = { day: string; protein: number; carbs: number; fat: number };
const macroSeries: MacroPoint[] = [
  { day: 'Mon', protein: 92, carbs: 180, fat: 55 },
  { day: 'Tue', protein: 110, carbs: 150, fat: 48 },
  { day: 'Wed', protein: 85, carbs: 210, fat: 62 },
  { day: 'Thu', protein: 98, carbs: 165, fat: 50 },
  { day: 'Fri', protein: 120, carbs: 140, fat: 58 },
  { day: 'Sat', protein: 75, carbs: 230, fat: 70 },
];
const macroDomain = macroSeries.map((d) => d.day);
const macroKeys = ['protein', 'carbs', 'fat'] as const;
const macroColor = scaleOrdinal<string, string>({
  domain: [...macroKeys],
  range: [proteinColor, carbsColor, fatColor],
});
const macroLabel: Record<(typeof macroKeys)[number], string> = {
  protein: 'Protein',
  carbs: 'Carbs',
  fat: 'Fat',
};

const activityDomain = activityData.map((d) => d.day);
const shortDateFmt = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

const cardTooltipStyle: React.CSSProperties = {
  ...defaultStyles,
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-s)',
  minInlineSize: 160,
  padding: 'var(--space-s)',
  pointerEvents: 'none',
};

const asNumber = (value: unknown): number => (value == null ? 0 : Number(value));

const Swatch: React.FC<{ color: string; tall?: boolean }> = ({ color, tall }) => (
  <span
    aria-hidden
    style={{
      display: 'inline-block',
      inlineSize: tall ? 3 : 10,
      blockSize: tall ? 14 : 10,
      borderRadius: tall ? 1 : 'var(--radius-xs)',
      background: color,
      flexShrink: 0,
    }}
  />
);

export const kcalValue = (value: number): React.ReactNode => (
  <>
    <span style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{value}</span>
    <span style={{ color: mutedLabel }}> kcal</span>
  </>
);

export const bpmValue = (value: number): React.ReactNode => (
  <>
    <span style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{value}</span>
    <span style={{ color: mutedLabel }}> bpm</span>
  </>
);

export const hoursValue = (value: number): React.ReactNode => (
  <>
    <span style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{value.toFixed(1)}</span>
    <span style={{ color: mutedLabel }}> hr</span>
  </>
);

export const stepsValue = (value: number): React.ReactNode => (
  <>
    <span style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{value.toLocaleString('en-US')}</span>
    <span style={{ color: mutedLabel }}> steps</span>
  </>
);

export const kmValue = (value: number): React.ReactNode => (
  <>
    <span style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{value.toFixed(1)}</span>
    <span style={{ color: mutedLabel }}> km</span>
  </>
);

export const gramValue = (value: number): React.ReactNode => (
  <>
    <span style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{value}</span>
    <span style={{ color: mutedLabel }}> g</span>
  </>
);

const ChartFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'relative', inlineSize: width }}>{children}</div>
);

const CardTooltipBody: React.FC<CardTooltipBodyProps> = ({
  title,
  rows,
  indicator = 'line',
  formatValue,
  showTotal,
}) => {
  const total = rows.reduce((sum, row) => sum + row.value, 0);

  return (
    <>
      {title ? <div style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{title}</div> : null}
      {rows.map((row) => (
        <div key={row.key} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-s)' }}>
          {indicator === 'dot' ? <Swatch color={row.color} /> : null}
          {indicator === 'line' ? <Swatch color={row.color} tall /> : null}
          {indicator === 'icon' ? row.icon : null}
          <span style={{ color: mutedLabel, flex: 1 }}>{row.label}</span>
          {formatValue ? (
            <span style={{ display: 'inline-flex', gap: '0.25ch', fontVariantNumeric: 'tabular-nums' }}>
              {formatValue(row.value)}
            </span>
          ) : (
            <span style={{ color: 'var(--global-foreground)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
              {row.value}
            </span>
          )}
        </div>
      ))}
      {showTotal ? (
        <>
          <div style={{ borderBlockStart: '1px solid var(--global-contrast)', marginBlockStart: 'var(--space-2xs)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-s)' }}>
            <span style={{ color: mutedLabel, flex: 1 }}>Total</span>
            <span style={{ display: 'inline-flex', gap: '0.25ch', fontVariantNumeric: 'tabular-nums' }}>
              {formatValue ? formatValue(total) : total}
            </span>
          </div>
        </>
      ) : null}
    </>
  );
};

const activityRows = (d: ActivityPoint): TooltipRow[] => [
  {
    key: 'move',
    label: 'Move',
    value: d.running,
    color: moveColor,
    icon: <Flame aria-hidden size={14} />,
  },
  {
    key: 'exercise',
    label: 'Exercise',
    value: d.swimming,
    color: exerciseColor,
    icon: <PersonSimpleWalk aria-hidden size={14} />,
  },
];

type ActivityHostProps = SeedIndexProps & {
  titleFor?: (d: ActivityPoint) => string | undefined;
  indicator?: TooltipIndicator;
  formatValue?: (value: number) => React.ReactNode;
  showTotal?: boolean;
};

/** Fitness Activity — stacked Move + Exercise bars. */
export const ActivityStackedBar: React.FC<ActivityHostProps> = ({
  titleFor,
  indicator = 'line',
  formatValue,
  showTotal,
  defaultOpenIndex = 1,
}) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<ActivityPoint>();
  const xScale = scaleBand<string>({
    domain: activityDomain,
    range: [0, innerWidth],
    padding: 0.3,
  });
  const yMax = Math.max(...activityData.map((d) => d.running + d.swimming));
  const yScale = scaleLinear<number>({
    domain: [0, yMax],
    range: [innerHeight, 0],
    nice: true,
  });
  const bandwidth = xScale.bandwidth();

  const openAt = (d: ActivityPoint) => {
    const barX = asNumber(xScale(d.day));
    const totalY = asNumber(yScale(d.running + d.swimming));
    showTooltip({
      tooltipData: d,
      tooltipLeft: margin.left + barX + bandwidth / 2,
      tooltipTop: margin.top + totalY,
    });
  };

  // ponytail: seed once for docs screenshot; fixed demo scales — no scale deps
  React.useEffect(() => {
    const seed = activityData[defaultOpenIndex];
    if (seed) openAt(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount seed only
  }, [defaultOpenIndex]);

  return (
    <ChartFrame>
      <svg width={width} height={height} role="img" aria-label="Activity Move and Exercise chart" onMouseLeave={hideTooltip}>
        <Group left={margin.left} top={margin.top}>
          {activityData.map((d) => {
            const barX = asNumber(xScale(d.day));
            const moveY = asNumber(yScale(d.running));
            const totalY = asNumber(yScale(d.running + d.swimming));
            const moveHeight = Math.max(0, innerHeight - moveY);
            const exerciseHeight = Math.max(0, moveY - totalY - stackGap);
            return (
              <Group key={d.key} onMouseMove={() => openAt(d)} style={{ cursor: 'default' }}>
                <Bar x={barX} y={moveY} width={bandwidth} height={moveHeight} fill={moveColor} />
                <BarRounded
                  x={barX}
                  y={totalY}
                  width={bandwidth}
                  height={exerciseHeight}
                  all={false}
                  top
                  fill={exerciseColor}
                />
              </Group>
            );
          })}
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            tickValues={thinDomainTicks(activityDomain, innerWidth)}
            hideAxisLine
            hideTicks
          />
        </Group>
      </svg>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={cardTooltipStyle}>
          <CardTooltipBody
            title={titleFor?.(tooltipData)}
            rows={activityRows(tooltipData)}
            indicator={indicator}
            formatValue={formatValue}
            showTotal={showTotal}
          />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

type HeartHostProps = SeedIndexProps & {
  titleFor?: (d: MobileDayPoint) => string | undefined;
  indicator?: TooltipIndicator;
  formatValue?: (value: number) => React.ReactNode;
};

/** iOS Health–style resting heart rate line. */
export const HeartRateLine: React.FC<HeartHostProps> = ({
  titleFor,
  indicator = 'none',
  formatValue,
  defaultOpenIndex = 10,
}) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<MobileDayPoint>();
  const xScale = scalePoint<string>({ domain: heartDomain, range: [0, innerWidth] });
  const yScale = scaleLinear<number>({
    domain: [50, 110],
    range: [innerHeight, 0],
    nice: true,
  });

  const openAt = (d: MobileDayPoint) => {
    showTooltip({
      tooltipData: d,
      tooltipLeft: margin.left + asNumber(xScale(d.key)),
      tooltipTop: margin.top + asNumber(yScale(d.bpm)),
    });
  };

  React.useEffect(() => {
    const seed = heartSeries[defaultOpenIndex] ?? heartSeries[heartSeries.length - 1];
    if (seed) openAt(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount seed only
  }, [defaultOpenIndex]);

  const onMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const point = localPoint(event);
    if (!point) return;
    const x = point.x - margin.left;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    for (let i = 0; i < heartDomain.length; i += 1) {
      const key = heartDomain[i];
      if (key == null) continue;
      const dist = Math.abs(asNumber(xScale(key)) - x);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    const hit = heartSeries[best];
    if (hit) openAt(hit);
  };

  return (
    <ChartFrame>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label="Resting heart rate chart"
        onMouseLeave={hideTooltip}
        onMouseMove={onMove}
      >
        <Group left={margin.left} top={margin.top}>
          <LinePath
            data={heartSeries}
            x={(d) => asNumber(xScale(d.key))}
            y={(d) => asNumber(yScale(d.bpm))}
            stroke={heartColor}
            curve={curveMonotoneX}
          />
          {tooltipData ? (
            <Circle
              cx={asNumber(xScale(tooltipData.key))}
              cy={asNumber(yScale(tooltipData.bpm))}
              r={4}
              fill={heartColor}
            />
          ) : null}
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            tickValues={thinDomainTicks(heartDomain, innerWidth)}
            tickFormat={(value) => shortDateFmt.format(new Date(`${String(value)}T00:00:00Z`))}
            hideAxisLine
            hideTicks
          />
        </Group>
      </svg>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={cardTooltipStyle}>
          <CardTooltipBody
            title={titleFor?.(tooltipData)}
            rows={[
              {
                key: 'hr',
                label: 'Heart Rate',
                value: tooltipData.bpm,
                color: heartColor,
                icon: <Heart aria-hidden size={14} />,
              },
            ]}
            indicator={indicator}
            formatValue={formatValue}
          />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

type SleepHostProps = SeedIndexProps & {
  titleFor?: (d: (typeof sleepSeries)[number]) => string | undefined;
  indicator?: TooltipIndicator;
  formatValue?: (value: number) => React.ReactNode;
};

/** Nightly sleep — indigo area (not another bar chart). */
export const SleepArea: React.FC<SleepHostProps> = ({
  titleFor = () => 'Sleep',
  indicator = 'line',
  formatValue = hoursValue,
  defaultOpenIndex = 3,
}) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip<(typeof sleepSeries)[number]>();
  const xScale = scalePoint<string>({ domain: sleepDomain, range: [0, innerWidth] });
  const yScale = scaleLinear<number>({ domain: [0, 10], range: [innerHeight, 0], nice: true });

  const openAt = (d: (typeof sleepSeries)[number]) => {
    showTooltip({
      tooltipData: d,
      tooltipLeft: margin.left + asNumber(xScale(d.day)),
      tooltipTop: margin.top + asNumber(yScale(d.hours)),
    });
  };

  React.useEffect(() => {
    const seed = sleepSeries[defaultOpenIndex];
    if (seed) openAt(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount seed only
  }, [defaultOpenIndex]);

  const onMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const point = localPoint(event);
    if (!point) return;
    const x = point.x - margin.left;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    for (let i = 0; i < sleepDomain.length; i += 1) {
      const key = sleepDomain[i];
      if (key == null) continue;
      const dist = Math.abs(asNumber(xScale(key)) - x);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    const hit = sleepSeries[best];
    if (hit) openAt(hit);
  };

  return (
    <ChartFrame>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label="Sleep duration chart"
        onMouseLeave={hideTooltip}
        onMouseMove={onMove}
      >
        <Group left={margin.left} top={margin.top}>
          <AreaClosed
            data={[...sleepSeries]}
            x={(d) => asNumber(xScale(d.day))}
            y={(d) => asNumber(yScale(d.hours))}
            yScale={yScale}
            stroke={sleepColor}
            curve={curveMonotoneX}
            fromOpacity={0.45}
            toOpacity={0.05}
          />
          {tooltipData ? (
            <Circle
              cx={asNumber(xScale(tooltipData.day))}
              cy={asNumber(yScale(tooltipData.hours))}
              r={4}
              fill={sleepColor}
            />
          ) : null}
          <AxisBottom top={innerHeight} scale={xScale} hideAxisLine hideTicks />
        </Group>
      </svg>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={cardTooltipStyle}>
          <CardTooltipBody
            title={titleFor?.(tooltipData)}
            rows={[
              {
                key: 'sleep',
                label: 'Time Asleep',
                value: tooltipData.hours,
                color: sleepColor,
                icon: <Moon aria-hidden size={14} />,
              },
            ]}
            indicator={indicator}
            formatValue={formatValue}
          />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

type StepsHostProps = SeedIndexProps & {
  titleFor?: (d: DenseDayPoint) => string | undefined;
  indicator?: TooltipIndicator;
  formatValue?: (value: number) => React.ReactNode;
};

/** Daily steps — cyan line + dots (not columns). */
export const StepsLine: React.FC<StepsHostProps> = ({
  titleFor,
  indicator = 'dot',
  formatValue = stepsValue,
  defaultOpenIndex = 4,
}) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<DenseDayPoint>();
  const xScale = scalePoint<string>({ domain: stepsDomain, range: [0, innerWidth] });
  const yMax = Math.max(...stepsSeries.map((d) => d.value));
  const yScale = scaleLinear<number>({ domain: [0, yMax * 1.1], range: [innerHeight, 0], nice: true });

  const openAt = (d: DenseDayPoint) => {
    showTooltip({
      tooltipData: d,
      tooltipLeft: margin.left + asNumber(xScale(d.key)),
      tooltipTop: margin.top + asNumber(yScale(d.value)),
    });
  };

  React.useEffect(() => {
    const seed = stepsSeries[defaultOpenIndex];
    if (seed) openAt(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount seed only
  }, [defaultOpenIndex]);

  const onMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const point = localPoint(event);
    if (!point) return;
    const x = point.x - margin.left;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    for (let i = 0; i < stepsDomain.length; i += 1) {
      const key = stepsDomain[i];
      if (key == null) continue;
      const dist = Math.abs(asNumber(xScale(key)) - x);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    const hit = stepsSeries[best];
    if (hit) openAt(hit);
  };

  return (
    <ChartFrame>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label="Daily steps chart"
        onMouseLeave={hideTooltip}
        onMouseMove={onMove}
      >
        <Group left={margin.left} top={margin.top}>
          <LinePath
            data={stepsSeries}
            x={(d) => asNumber(xScale(d.key))}
            y={(d) => asNumber(yScale(d.value))}
            stroke={stepsColor}
            curve={curveMonotoneX}
            strokeWidth={2}
          />
          {stepsSeries.map((d) => (
            <Circle
              key={d.key}
              cx={asNumber(xScale(d.key))}
              cy={asNumber(yScale(d.value))}
              r={tooltipData?.key === d.key ? 5 : 3}
              fill={stepsColor}
            />
          ))}
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            tickFormat={(value) => {
              const hit = stepsSeries.find((d) => d.key === value);
              return hit?.shortLabel ?? String(value);
            }}
            hideAxisLine
            hideTicks
          />
        </Group>
      </svg>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={cardTooltipStyle}>
          <CardTooltipBody
            title={titleFor?.(tooltipData)}
            rows={[
              {
                key: 'steps',
                label: 'Steps',
                value: tooltipData.value,
                color: stepsColor,
                icon: <PersonSimpleWalk aria-hidden size={14} />,
              },
            ]}
            indicator={indicator}
            formatValue={formatValue}
          />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

type DistanceHostProps = SeedIndexProps & {
  titleFor?: (d: (typeof distanceSeries)[number]) => string | undefined;
  indicator?: TooltipIndicator;
  formatValue?: (value: number) => React.ReactNode;
};

/** Outdoor walk distance — magenta line + km formatter. */
export const DistanceLine: React.FC<DistanceHostProps> = ({
  titleFor,
  indicator = 'none',
  formatValue = kmValue,
  defaultOpenIndex = 6,
}) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip<(typeof distanceSeries)[number]>();
  const xScale = scalePoint<string>({ domain: distanceDomain, range: [0, innerWidth] });
  const yMax = Math.max(...distanceSeries.map((d) => d.km));
  const yScale = scaleLinear<number>({
    domain: [0, yMax * 1.15],
    range: [innerHeight, 0],
    nice: true,
  });

  const openAt = (d: (typeof distanceSeries)[number]) => {
    showTooltip({
      tooltipData: d,
      tooltipLeft: margin.left + asNumber(xScale(d.key)),
      tooltipTop: margin.top + asNumber(yScale(d.km)),
    });
  };

  React.useEffect(() => {
    const seed = distanceSeries[defaultOpenIndex] ?? distanceSeries[distanceSeries.length - 1];
    if (seed) openAt(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount seed only
  }, [defaultOpenIndex]);

  const onMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const point = localPoint(event);
    if (!point) return;
    const x = point.x - margin.left;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    for (let i = 0; i < distanceDomain.length; i += 1) {
      const key = distanceDomain[i];
      if (key == null) continue;
      const dist = Math.abs(asNumber(xScale(key)) - x);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    const hit = distanceSeries[best];
    if (hit) openAt(hit);
  };

  return (
    <ChartFrame>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label="Walk distance chart"
        onMouseLeave={hideTooltip}
        onMouseMove={onMove}
      >
        <Group left={margin.left} top={margin.top}>
          <LinePath
            data={distanceSeries}
            x={(d) => asNumber(xScale(d.key))}
            y={(d) => asNumber(yScale(d.km))}
            stroke={distanceColor}
            curve={curveMonotoneX}
            strokeWidth={2}
          />
          {tooltipData ? (
            <Circle
              cx={asNumber(xScale(tooltipData.key))}
              cy={asNumber(yScale(tooltipData.km))}
              r={4}
              fill={distanceColor}
            />
          ) : null}
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            tickValues={thinDomainTicks(distanceDomain, innerWidth)}
            tickFormat={(value) => shortDateFmt.format(new Date(`${String(value)}T00:00:00Z`))}
            hideAxisLine
            hideTicks
          />
        </Group>
      </svg>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={cardTooltipStyle}>
          <CardTooltipBody
            title={titleFor?.(tooltipData)}
            rows={[
              {
                key: 'distance',
                label: 'Distance',
                value: tooltipData.km,
                color: distanceColor,
                icon: <PersonSimpleWalk aria-hidden size={14} />,
              },
            ]}
            indicator={indicator}
            formatValue={formatValue}
          />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

type WorkoutHostProps = SeedIndexProps & {
  titleFor?: () => string | undefined;
  indicator?: TooltipIndicator;
};

/** Workout mix pie — icons instead of swatches. */
export const WorkoutPie: React.FC<WorkoutHostProps> = ({
  titleFor = () => 'This week',
  indicator = 'icon',
  defaultOpenIndex = 0,
}) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip<(typeof workoutSlices)[number]>();
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerX = width / 2;
  const centerY = height / 2 - 8;

  React.useEffect(() => {
    const seed = workoutSlices[defaultOpenIndex];
    if (seed) {
      showTooltip({
        tooltipData: seed,
        tooltipLeft: centerX,
        tooltipTop: centerY - radius * 0.35,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount seed only
  }, [defaultOpenIndex]);

  return (
    <ChartFrame>
      <svg width={width} height={height} role="img" aria-label="Workout mix pie chart" onMouseLeave={hideTooltip}>
        <Group top={centerY} left={centerX}>
          <Pie
            data={[...workoutSlices]}
            pieValue={(d) => d.value}
            outerRadius={radius}
            padAngle={0.02}
          >
            {({ arcs, path }) =>
              arcs.map((arc) => (
                <path
                  key={arc.data.key}
                  d={path(arc) ?? undefined}
                  fill={arc.data.color}
                  stroke="var(--global-background)"
                  strokeWidth={2}
                  onMouseMove={() => {
                    showTooltip({
                      tooltipData: arc.data,
                      tooltipLeft: centerX,
                      tooltipTop: centerY - radius * 0.35,
                    });
                  }}
                />
              ))
            }
          </Pie>
        </Group>
      </svg>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={cardTooltipStyle}>
          <CardTooltipBody
            title={titleFor?.()}
            rows={[
              {
                key: tooltipData.key,
                label: tooltipData.label,
                value: tooltipData.value,
                color: tooltipData.color,
                icon: tooltipData.icon,
              },
            ]}
            indicator={indicator}
            formatValue={(n) => (
              <>
                <span style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{n}</span>
                <span style={{ color: mutedLabel }}>%</span>
              </>
            )}
          />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

type MacroHostProps = SeedIndexProps & {
  titleFor?: (d: MacroPoint) => string | undefined;
  indicator?: TooltipIndicator;
  formatValue?: (value: number) => React.ReactNode;
  showTotal?: boolean;
};

/** Macro stack — literal `--color-*-30` fills (mode-stable) with total row. */
export const MacroStackedArea: React.FC<MacroHostProps> = ({
  titleFor = (d) => d.day,
  indicator = 'dot',
  formatValue = gramValue,
  showTotal = true,
  defaultOpenIndex = 2,
}) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<MacroPoint>();
  const xScale = scalePoint<string>({ domain: macroDomain, range: [0, innerWidth] });
  const yMax = Math.max(...macroSeries.map((d) => d.protein + d.carbs + d.fat));
  const yScale = scaleLinear<number>({
    domain: [0, yMax * 1.1],
    range: [innerHeight, 0],
    nice: true,
  });

  const openAt = (d: MacroPoint) => {
    showTooltip({
      tooltipData: d,
      tooltipLeft: margin.left + asNumber(xScale(d.day)),
      tooltipTop: margin.top + asNumber(yScale(d.protein + d.carbs + d.fat)),
    });
  };

  React.useEffect(() => {
    const seed = macroSeries[defaultOpenIndex];
    if (seed) openAt(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount seed only
  }, [defaultOpenIndex]);

  const onMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const point = localPoint(event);
    if (!point) return;
    const x = point.x - margin.left;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    for (let i = 0; i < macroDomain.length; i += 1) {
      const key = macroDomain[i];
      if (key == null) continue;
      const dist = Math.abs(asNumber(xScale(key)) - x);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    const hit = macroSeries[best];
    if (hit) openAt(hit);
  };

  return (
    <ChartFrame>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label="Macro stacked area chart"
        onMouseLeave={hideTooltip}
        onMouseMove={onMove}
      >
        <Group left={margin.left} top={margin.top}>
          <AreaStack
            data={macroSeries}
            keys={[...macroKeys]}
            x={(d) => asNumber(xScale((d.data as MacroPoint).day))}
            y0={(d) => asNumber(yScale(d[0]))}
            y1={(d) => asNumber(yScale(d[1]))}
            color={(key) => macroColor(String(key))}
            curve={curveMonotoneX}
          >
            {({ stacks, path }) =>
              stacks.map((stack) => (
                <path
                  key={`macro-${stack.key}`}
                  d={path(stack) || ''}
                  fill={macroColor(String(stack.key))}
                  fillOpacity={0.55}
                />
              ))
            }
          </AreaStack>
          {tooltipData ? (
            <Circle
              cx={asNumber(xScale(tooltipData.day))}
              cy={asNumber(yScale(tooltipData.protein + tooltipData.carbs + tooltipData.fat))}
              r={4}
              fill="var(--global-foreground)"
            />
          ) : null}
          <AxisBottom top={innerHeight} scale={xScale} hideAxisLine hideTicks />
        </Group>
      </svg>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={cardTooltipStyle}>
          <CardTooltipBody
            title={titleFor?.(tooltipData)}
            rows={macroKeys.map((key) => ({
              key,
              label: macroLabel[key],
              value: tooltipData[key],
              color: macroColor(key),
              icon: <ForkKnife aria-hidden size={14} />,
            }))}
            indicator={indicator}
            formatValue={formatValue}
            showTotal={showTotal}
          />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

type EnergyHostProps = SeedIndexProps & {
  titleFor?: (d: (typeof energySeries)[number]) => string | undefined;
  indicator?: TooltipIndicator;
  formatValue?: (value: number) => React.ReactNode;
};

/** Active Energy area — kcal burn across the week. */
export const ActiveEnergyArea: React.FC<EnergyHostProps> = ({
  titleFor,
  indicator = 'none',
  formatValue = kcalValue,
  defaultOpenIndex = 2,
}) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip<(typeof energySeries)[number]>();
  const xScale = scalePoint<string>({ domain: energyDomain, range: [0, innerWidth] });
  const yMax = Math.max(...energySeries.map((d) => d.kcal));
  const yScale = scaleLinear<number>({
    domain: [0, yMax * 1.1],
    range: [innerHeight, 0],
    nice: true,
  });

  const openAt = (d: (typeof energySeries)[number]) => {
    showTooltip({
      tooltipData: d,
      tooltipLeft: margin.left + asNumber(xScale(d.day)),
      tooltipTop: margin.top + asNumber(yScale(d.kcal)),
    });
  };

  React.useEffect(() => {
    const seed = energySeries[defaultOpenIndex];
    if (seed) openAt(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount seed only
  }, [defaultOpenIndex]);

  const onMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const point = localPoint(event);
    if (!point) return;
    const x = point.x - margin.left;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    for (let i = 0; i < energyDomain.length; i += 1) {
      const key = energyDomain[i];
      if (key == null) continue;
      const dist = Math.abs(asNumber(xScale(key)) - x);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    const hit = energySeries[best];
    if (hit) openAt(hit);
  };

  return (
    <ChartFrame>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label="Active Energy chart"
        onMouseLeave={hideTooltip}
        onMouseMove={onMove}
      >
        <Group left={margin.left} top={margin.top}>
          <AreaClosed
            data={energySeries}
            x={(d) => asNumber(xScale(d.day))}
            y={(d) => asNumber(yScale(d.kcal))}
            yScale={yScale}
            stroke={energyColor}
            curve={curveMonotoneX}
            fromOpacity={0.4}
            toOpacity={0.05}
          />
          {tooltipData ? (
            <Circle
              cx={asNumber(xScale(tooltipData.day))}
              cy={asNumber(yScale(tooltipData.kcal))}
              r={4}
              fill={energyColor}
            />
          ) : null}
          <AxisBottom top={innerHeight} scale={xScale} hideAxisLine hideTicks />
        </Group>
      </svg>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={cardTooltipStyle}>
          <CardTooltipBody
            title={titleFor?.(tooltipData)}
            rows={[
              {
                key: 'energy',
                label: 'Active Energy',
                value: tooltipData.kcal,
                color: energyColor,
                icon: <Flame aria-hidden size={14} />,
              },
            ]}
            indicator={indicator}
            formatValue={formatValue}
          />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

export const isoTitle = (d: ActivityPoint) => d.key;
export const sleepTitle = () => 'Sleep';
export const heartDateTitle = (d: MobileDayPoint) => d.dateLabel;
export const stepsDateTitle = (d: DenseDayPoint) => d.title;
export const distanceDateTitle = (d: (typeof distanceSeries)[number]) => d.dateLabel;
export const workoutTitle = () => 'This week';
export const macroDayTitle = (d: MacroPoint) => d.day;
