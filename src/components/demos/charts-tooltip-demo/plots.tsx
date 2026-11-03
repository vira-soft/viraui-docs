"use client";

import { Flame, Heart, Moon, PersonSimpleWalk } from '@phosphor-icons/react';
import * as React from 'react';

import {
  AreaClosed,
  AxisBottom,
  Bar,
  BarRounded,
  Circle,
  Group,
  LinePath,
  TooltipWithBounds,
  curveMonotoneX,
  defaultStyles,
  localPoint,
  scaleBand,
  scaleLinear,
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

const activityDomain = activityData.map((d) => d.day);
const longDateFmt = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});
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

/** Nightly sleep duration bars. */
export const SleepBars: React.FC<SleepHostProps> = ({
  titleFor = () => 'Sleep',
  indicator = 'line',
  formatValue = hoursValue,
  defaultOpenIndex = 3,
}) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } =
    useTooltip<(typeof sleepSeries)[number]>();
  const xScale = scaleBand<string>({ domain: sleepDomain, range: [0, innerWidth], padding: 0.28 });
  const yScale = scaleLinear<number>({ domain: [0, 10], range: [innerHeight, 0], nice: true });
  const bandwidth = xScale.bandwidth();

  const openAt = (d: (typeof sleepSeries)[number]) => {
    const barX = asNumber(xScale(d.day));
    const barY = asNumber(yScale(d.hours));
    showTooltip({
      tooltipData: d,
      tooltipLeft: margin.left + barX + bandwidth / 2,
      tooltipTop: margin.top + barY,
    });
  };

  React.useEffect(() => {
    const seed = sleepSeries[defaultOpenIndex];
    if (seed) openAt(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount seed only
  }, [defaultOpenIndex]);

  return (
    <ChartFrame>
      <svg width={width} height={height} role="img" aria-label="Sleep duration chart" onMouseLeave={hideTooltip}>
        <Group left={margin.left} top={margin.top}>
          {sleepSeries.map((d) => {
            const barY = asNumber(yScale(d.hours));
            return (
              <BarRounded
                key={d.key}
                x={asNumber(xScale(d.day))}
                y={barY}
                width={bandwidth}
                height={Math.max(0, innerHeight - barY)}
                fill={sleepColor}
                onMouseMove={() => openAt(d)}
              />
            );
          })}
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

/** Daily steps columns with long-date titles. */
export const StepsBars: React.FC<StepsHostProps> = ({
  titleFor,
  indicator = 'dot',
  formatValue = stepsValue,
  defaultOpenIndex = 4,
}) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<DenseDayPoint>();
  const xScale = scaleBand<string>({ domain: stepsDomain, range: [0, innerWidth], padding: 0.2 });
  const yMax = Math.max(...stepsSeries.map((d) => d.value));
  const yScale = scaleLinear<number>({ domain: [0, yMax], range: [innerHeight, 0], nice: true });
  const bandwidth = xScale.bandwidth();

  const openAt = (d: DenseDayPoint) => {
    const barX = asNumber(xScale(d.key));
    const barY = asNumber(yScale(d.value));
    showTooltip({
      tooltipData: d,
      tooltipLeft: margin.left + barX + bandwidth / 2,
      tooltipTop: margin.top + barY,
    });
  };

  React.useEffect(() => {
    const seed = stepsSeries[defaultOpenIndex];
    if (seed) openAt(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount seed only
  }, [defaultOpenIndex]);

  return (
    <ChartFrame>
      <svg width={width} height={height} role="img" aria-label="Daily steps chart" onMouseLeave={hideTooltip}>
        <Group left={margin.left} top={margin.top}>
          {stepsSeries.map((d) => {
            const barY = asNumber(yScale(d.value));
            return (
              <BarRounded
                key={d.key}
                x={asNumber(xScale(d.key))}
                y={barY}
                width={bandwidth}
                height={Math.max(0, innerHeight - barY)}
                fill={stepsColor}
                onMouseMove={() => openAt(d)}
              />
            );
          })}
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
export const longDateTitle = (d: ActivityPoint) => longDateFmt.format(new Date(`${d.key}T00:00:00Z`));
export const customLabelTitle = () => 'Activities';
export const sleepTitle = () => 'Sleep';
export const heartDateTitle = (d: MobileDayPoint) => d.dateLabel;
export const stepsDateTitle = (d: DenseDayPoint) => d.title;
