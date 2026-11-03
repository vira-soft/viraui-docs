"use client";

import { PersonSimpleWalk, Waves } from '@phosphor-icons/react';
import * as React from 'react';

import {
  AxisBottom,
  Bar,
  BarRounded,
  Group,
  TooltipWithBounds,
  defaultStyles,
  scaleBand,
  scaleLinear,
  useTooltip,
} from '@viraui/charts';
import { mutedLabel } from '../../../lib/chart-tokens';
import { thinDomainTicks } from '../../../lib/chart-ticks';
import { activityData, type ActivityPoint } from '../../../lib/chart-story-data';

type TooltipIndicator = 'dot' | 'line' | 'none' | 'icon';

type ActivityTooltipBodyProps = {
  title?: string;
  running: number;
  swimming: number;
  indicator?: TooltipIndicator;
  formatValue?: (value: number) => React.ReactNode;
  showTotal?: boolean;
};

type ActivityStackedBarProps = {
  /** ISO weekday title, custom heading, or omit for no label. */
  titleFor?: (d: ActivityPoint) => string | undefined;
  indicator?: TooltipIndicator;
  formatValue?: (value: number) => React.ReactNode;
  showTotal?: boolean;
  /** Open tooltip on mount for docs screenshots (Tue = 1). */
  defaultOpenIndex?: number;
};

const width = 560;
const height = 320;
const margin = { top: 28, right: 24, bottom: 40, left: 48 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;
const stackGap = 3;

const runningColor = 'var(--highlight-blue)';
const swimmingColor = 'var(--highlight-indigo)';

const activityDomain = activityData.map((d) => d.day);
const activityDateFmt = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
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

const ChartFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'relative', inlineSize: width }}>{children}</div>
);

const ActivityTooltipBody: React.FC<ActivityTooltipBodyProps> = ({
  title,
  running,
  swimming,
  indicator = 'line',
  formatValue,
  showTotal,
}) => {
  const rows = [
    {
      key: 'running',
      label: 'Running',
      value: running,
      color: runningColor,
      icon: <PersonSimpleWalk aria-hidden size={14} />,
    },
    {
      key: 'swimming',
      label: 'Swimming',
      value: swimming,
      color: swimmingColor,
      icon: <Waves aria-hidden size={14} />,
    },
  ] as const;

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
              {formatValue ? formatValue(running + swimming) : running + swimming}
            </span>
          </div>
        </>
      ) : null}
    </>
  );
};

/** Stacked Running + Swimming host — body variants are the story. */
export const ActivityStackedBar: React.FC<ActivityStackedBarProps> = ({
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

  // ponytail: seed once for Storybook screenshot; fixed demo scales — no scale deps
  React.useEffect(() => {
    const seed = activityData[defaultOpenIndex];
    if (seed) openAt(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount seed only
  }, [defaultOpenIndex]);

  return (
    <ChartFrame>
      <svg width={width} height={height} role="img" aria-label="Activity stacked bar chart" onMouseLeave={hideTooltip}>
        <Group left={margin.left} top={margin.top}>
          {activityData.map((d) => {
            const barX = asNumber(xScale(d.day));
            const runningY = asNumber(yScale(d.running));
            const totalY = asNumber(yScale(d.running + d.swimming));
            const runningHeight = Math.max(0, innerHeight - runningY);
            const swimmingHeight = Math.max(0, runningY - totalY - stackGap);
            return (
              <Group key={d.key} onMouseMove={() => openAt(d)} style={{ cursor: 'default' }}>
                <Bar x={barX} y={runningY} width={bandwidth} height={runningHeight} fill={runningColor} />
                <BarRounded
                  x={barX}
                  y={totalY}
                  width={bandwidth}
                  height={swimmingHeight}
                  all={false}
                  top
                  fill={swimmingColor}
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
          <ActivityTooltipBody
            title={titleFor?.(tooltipData)}
            running={tooltipData.running}
            swimming={tooltipData.swimming}
            indicator={indicator}
            formatValue={formatValue}
            showTotal={showTotal}
          />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

export const isoTitle = (d: ActivityPoint) => d.key;
export const longDateTitle = (d: ActivityPoint) => activityDateFmt.format(new Date(`${d.key}T00:00:00Z`));
export const customLabelTitle = () => 'Activities';
