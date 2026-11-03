"use client";

import * as React from 'react';

import {
  AxisBottom,
  AxisLeft,
  Bar,
  BarRounded,
  GridColumns,
  GridRows,
  Group,
  LegendItem,
  LegendLabel,
  LegendOrdinal,
  RectShape,
  Text,
  ParentSize,
  TooltipWithBounds,
  defaultStyles,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  useTooltip,
} from '@viraui/charts';
import { hoverFill, mutedLabel } from '../../../lib/chart-tokens';
import { thinDomainTicks } from '../../../lib/chart-ticks';
import {
  browserData,
  denseData,
  desktopData,
  fullMonthData,
  monthDomain,
  monthTitles,
  multiData,
  signedData,
} from '../../../lib/chart-story-data';

type TooltipDatum = {
  title?: string;
  label: string;
  value: number;
  color: string;
  /** Band domain key — dense hover column. */
  bandKey?: string;
  secondary?: {
    label: string;
    value: number;
    color: string;
  };
};

const width = 560;
const height = 320;
const margin = { top: 28, right: 24, bottom: 40, left: 48 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const denseHeight = 280;
const denseMargin = { top: 16, right: 16, bottom: 40, left: 16 };

const seriesColor = 'var(--highlight-cyan)';
const seriesColorAlt = 'var(--highlight-indigo)';
const denseSeriesColor = 'var(--highlight-blue)';
/** Full-pill override — package default is `radius={8}` + `all`. */
const barRadiusFull = 999;
const stackGap = 3;

const denseDomain = denseData.map((d) => d.key);
const denseByKey = new Map(denseData.map((d) => [d.key, d]));

const browserColors = [
  'var(--highlight-cyan)',
  'var(--highlight-blue)',
  'var(--highlight-indigo)',
  'var(--highlight-purple)',
  'var(--highlight-slate)',
];

const cardTooltipStyle: React.CSSProperties = {
  ...defaultStyles,
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-s)',
  minInlineSize: 160,
  padding: 'var(--space-s)',
  pointerEvents: 'none',
};

const pillTooltipStyle: React.CSSProperties = {
  ...defaultStyles,
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-s)',
  paddingBlock: 'var(--space-xs)',
  paddingInline: 'var(--space-s)',
  borderRadius: 'var(--radius-full)',
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

const PillTooltipBody: React.FC<TooltipDatum> = ({ label, value, color }) => (
  <>
    <Swatch color={color} />
    <span style={{ color: mutedLabel }}>{label}</span>
    <span style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{value}</span>
  </>
);

const CardTooltipBody: React.FC<TooltipDatum> = ({ title, label, value, color, secondary }) => (
  <>
    {title ? <div style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{title}</div> : null}
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-s)' }}>
      <Swatch color={color} tall />
      <span style={{ color: mutedLabel, flex: 1 }}>{label}</span>
      <span style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{value}</span>
    </div>
    {secondary ? (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-s)' }}>
        <Swatch color={secondary.color} tall />
        <span style={{ color: mutedLabel, flex: 1 }}>{secondary.label}</span>
        <span style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{secondary.value}</span>
      </div>
    ) : null}
  </>
);

const ChartFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'relative', inlineSize: width }}>{children}</div>
);

const SeriesLegend: React.FC = () => {
  const colorScale = scaleOrdinal({
    domain: ['Desktop', 'Mobile'],
    range: [seriesColor, seriesColorAlt],
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        paddingBlockStart: 'var(--space-s)',
      }}
    >
      <LegendOrdinal scale={colorScale} direction="row" labelMargin="0 16px 0 4px">
        {(labels) =>
          labels.map((label) => (
            <LegendItem key={label.text} margin="0 var(--space-s) 0 0">
              <RectShape width={10} height={10} fill={label.value} />
              <LegendLabel align="left" margin="0 0 0 var(--space-s)">
                {label.text}
              </LegendLabel>
            </LegendItem>
          ))
        }
      </LegendOrdinal>
    </div>
  );
};

/** Dense daily bars + hover column + card tooltip (no Y axis). X ticks thin to plot width. */
const DenseBarPlot: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();
  const innerWidth = Math.max(0, width - denseMargin.left - denseMargin.right);
  const innerHeight = Math.max(0, height - denseMargin.top - denseMargin.bottom);
  const xScale = scaleBand<string>({
    domain: denseDomain,
    range: [0, innerWidth],
    padding: 0.12,
  });
  const yScale = scaleLinear<number>({
    domain: [0, 400],
    range: [innerHeight, 0],
    nice: true,
  });
  const bandwidth = xScale.bandwidth();
  const tickValues = thinDomainTicks(denseDomain, innerWidth);
  const activeKey = tooltipOpen ? tooltipData?.bandKey : undefined;
  const hoverX = activeKey != null ? asNumber(xScale(activeKey)) : 0;

  if (width < 16 || height < 16) {
    return null;
  }

  return (
    <div style={{ position: 'relative', inlineSize: width }}>
      <svg width={width} height={height} role="img" aria-label="Dense page views bar chart" onMouseLeave={hideTooltip}>
        <Group left={denseMargin.left} top={denseMargin.top}>
          <GridRows scale={yScale} width={innerWidth} numTicks={3} />
          {activeKey != null ? (
            <Bar
              x={hoverX}
              y={0}
              width={bandwidth}
              height={innerHeight}
              fill={hoverFill}
              style={{ pointerEvents: 'none' }}
            />
          ) : null}
          {denseData.map((d) => {
            const barX = asNumber(xScale(d.key));
            const barY = asNumber(yScale(d.value));
            const barHeight = Math.max(0, innerHeight - barY);
            return (
              <Bar
                key={d.key}
                x={barX}
                y={barY}
                width={bandwidth}
                height={barHeight}
                fill={denseSeriesColor}
                onMouseMove={() => {
                  showTooltip({
                    tooltipData: {
                      bandKey: d.key,
                      title: d.title,
                      label: 'Page Views',
                      value: d.value,
                      color: denseSeriesColor,
                    },
                    tooltipLeft: denseMargin.left + barX + bandwidth / 2,
                    tooltipTop: denseMargin.top + barY,
                  });
                }}
              />
            );
          })}
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            tickValues={tickValues}
            tickFormat={(value) => denseByKey.get(String(value))?.shortLabel ?? String(value)}
            hideAxisLine
            hideTicks
          />
        </Group>
      </svg>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={cardTooltipStyle}>
          <CardTooltipBody {...tooltipData} />
        </TooltipWithBounds>
      ) : null}
    </div>
  );
};

export const DenseBar: React.FC = () => (
  <div style={{ boxSizing: 'border-box', width: '100%', height: denseHeight }}>
    <ParentSize debounceTime={0} initialSize={{ width: 720, height: denseHeight }}>
      {({ width, height }) => <DenseBarPlot width={width} height={height} />}
    </ParentSize>
  </div>
);

/** Vertical rounded single-series bars + month axis + row grid + tooltip. */
export const SimpleBar: React.FC<{ showYAxis?: boolean; ariaLabel?: string }> = ({
  showYAxis = false,
  ariaLabel = 'Simple bar chart',
}) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();
  const xScale = scaleBand<string>({
    domain: monthDomain,
    range: [0, innerWidth],
    padding: 0.3,
  });
  const yScale = scaleLinear<number>({
    domain: [0, 360],
    range: [innerHeight, 0],
    nice: true,
  });
  const bandwidth = xScale.bandwidth();

  return (
    <ChartFrame>
      <svg width={width} height={height} role="img" aria-label={ariaLabel} onMouseLeave={hideTooltip}>
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={yScale} width={innerWidth} numTicks={3} />
          {desktopData.map((d) => {
            const barX = asNumber(xScale(d.month));
            const barY = asNumber(yScale(d.value));
            const barHeight = Math.max(0, innerHeight - barY);
            return (
              <BarRounded
                key={d.month}
                x={barX}
                y={barY}
                width={bandwidth}
                height={barHeight}
                fill={seriesColor}
                onMouseMove={() => {
                  showTooltip({
                    tooltipData: {
                      label: 'Desktop',
                      value: d.value,
                      color: seriesColor,
                    },
                    tooltipLeft: margin.left + barX + bandwidth / 2,
                    tooltipTop: margin.top + barY,
                  });
                }}
              />
            );
          })}
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            tickValues={thinDomainTicks(monthDomain, innerWidth)}
            hideAxisLine
            hideTicks
          />
          {showYAxis ? <AxisLeft scale={yScale} hideAxisLine hideTicks numTicks={3} /> : null}
        </Group>
      </svg>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={pillTooltipStyle}>
          <PillTooltipBody {...tooltipData} />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

/** Horizontal rounded bars; category labels on the left. */
export const HorizontalBar: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();
  const yScale = scaleBand<string>({
    domain: monthDomain,
    range: [0, innerHeight],
    padding: 0.3,
  });
  const xScale = scaleLinear<number>({
    domain: [0, 360],
    range: [0, innerWidth],
    nice: true,
  });
  const bandwidth = yScale.bandwidth();

  return (
    <ChartFrame>
      <svg width={width} height={height} role="img" aria-label="Horizontal bar chart" onMouseLeave={hideTooltip}>
        <Group left={margin.left} top={margin.top}>
          {desktopData.map((d) => {
            const barY = asNumber(yScale(d.month));
            const barWidth = asNumber(xScale(d.value));
            return (
              <BarRounded
                key={d.month}
                x={0}
                y={barY}
                width={barWidth}
                height={bandwidth}
                radius={barRadiusFull}
                all
                fill={seriesColor}
                onMouseMove={() => {
                  showTooltip({
                    tooltipData: { label: 'Desktop', value: d.value, color: seriesColor },
                    tooltipLeft: margin.left + barWidth,
                    tooltipTop: margin.top + barY + bandwidth / 2,
                  });
                }}
              />
            );
          })}
          <AxisLeft scale={yScale} hideAxisLine hideTicks />
        </Group>
      </svg>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={pillTooltipStyle}>
          <PillTooltipBody {...tooltipData} />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

/** Clustered Desktop + Mobile bars with card tooltip. */
export const MultipleBar: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();
  const xScale = scaleBand<string>({
    domain: monthDomain,
    range: [0, innerWidth],
    padding: 0.25,
  });
  const xGroup = scaleBand<string>({
    domain: ['desktop', 'mobile'],
    range: [0, xScale.bandwidth()],
    padding: 0.15,
  });
  const yScale = scaleLinear<number>({
    domain: [0, 360],
    range: [innerHeight, 0],
    nice: true,
  });
  const seriesBandwidth = xGroup.bandwidth();

  return (
    <ChartFrame>
      <svg width={width} height={height} role="img" aria-label="Multiple series bar chart" onMouseLeave={hideTooltip}>
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={yScale} width={innerWidth} numTicks={3} />
          {multiData.map((d) => {
            const groupX = asNumber(xScale(d.month));
            const desktopX = groupX + asNumber(xGroup('desktop'));
            const mobileX = groupX + asNumber(xGroup('mobile'));
            const desktopY = asNumber(yScale(d.desktop));
            const mobileY = asNumber(yScale(d.mobile));
            const openTooltip = () => {
              showTooltip({
                tooltipData: {
                  title: monthTitles[d.month] ?? d.month,
                  label: 'Desktop',
                  value: d.desktop,
                  color: seriesColor,
                  secondary: { label: 'Mobile', value: d.mobile, color: seriesColorAlt },
                },
                tooltipLeft: margin.left + groupX + xScale.bandwidth() / 2,
                tooltipTop: margin.top + Math.min(desktopY, mobileY),
              });
            };
            return (
              <Group key={d.month}>
                <BarRounded
                  x={desktopX}
                  y={desktopY}
                  width={seriesBandwidth}
                  height={Math.max(0, innerHeight - desktopY)}
                  all={false}
                  top
                  fill={seriesColor}
                  onMouseMove={openTooltip}
                />
                <BarRounded
                  x={mobileX}
                  y={mobileY}
                  width={seriesBandwidth}
                  height={Math.max(0, innerHeight - mobileY)}
                  all={false}
                  top
                  fill={seriesColorAlt}
                  onMouseMove={openTooltip}
                />
              </Group>
            );
          })}
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            tickValues={thinDomainTicks(monthDomain, innerWidth)}
            hideAxisLine
            hideTicks
          />
        </Group>
      </svg>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={cardTooltipStyle}>
          <CardTooltipBody {...tooltipData} />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

/** Stacked Desktop + Mobile with background gap + bottom legend. */
export const StackedBar: React.FC = () => {
  const xScale = scaleBand<string>({
    domain: monthDomain,
    range: [0, innerWidth],
    padding: 0.3,
  });
  const yMax = Math.max(...multiData.map((d) => d.desktop + d.mobile));
  const yScale = scaleLinear<number>({
    domain: [0, yMax],
    range: [innerHeight, 0],
    nice: true,
  });
  const bandwidth = xScale.bandwidth();

  return (
    <ChartFrame>
      <svg width={width} height={height} role="img" aria-label="Stacked bar chart">
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={yScale} width={innerWidth} numTicks={3} />
          {multiData.map((d) => {
            const barX = asNumber(xScale(d.month));
            const desktopY = asNumber(yScale(d.desktop));
            const totalY = asNumber(yScale(d.desktop + d.mobile));
            const desktopHeight = Math.max(0, innerHeight - desktopY);
            const mobileHeight = Math.max(0, desktopY - totalY - stackGap);
            return (
              <Group key={d.month}>
                <Bar x={barX} y={desktopY} width={bandwidth} height={desktopHeight} fill={seriesColor} />
                <BarRounded
                  x={barX}
                  y={totalY}
                  width={bandwidth}
                  height={mobileHeight}
                  all={false}
                  top
                  fill={seriesColorAlt}
                />
              </Group>
            );
          })}
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            tickValues={thinDomainTicks(monthDomain, innerWidth)}
            hideAxisLine
            hideTicks
          />
        </Group>
      </svg>
      <SeriesLegend />
    </ChartFrame>
  );
};

/** Vertical bars with value labels above each bar. */
export const LabelBar: React.FC = () => {
  const xScale = scaleBand<string>({
    domain: monthDomain,
    range: [0, innerWidth],
    padding: 0.3,
  });
  const yScale = scaleLinear<number>({
    domain: [0, 360],
    range: [innerHeight, 0],
    nice: true,
  });
  const bandwidth = xScale.bandwidth();

  return (
    <ChartFrame>
      <svg width={width} height={height} role="img" aria-label="Bar chart with value labels">
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={yScale} width={innerWidth} numTicks={3} />
          {desktopData.map((d) => {
            const barX = asNumber(xScale(d.month));
            const barY = asNumber(yScale(d.value));
            return (
              <Group key={d.month}>
                <BarRounded
                  x={barX}
                  y={barY}
                  width={bandwidth}
                  height={Math.max(0, innerHeight - barY)}
                  fill={seriesColor}
                />
                <Text x={barX + bandwidth / 2} y={barY - 8} textAnchor="middle" verticalAnchor="end">
                  {d.value}
                </Text>
              </Group>
            );
          })}
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            tickValues={thinDomainTicks(monthDomain, innerWidth)}
            hideAxisLine
            hideTicks
          />
        </Group>
      </svg>
    </ChartFrame>
  );
};

/** Horizontal bars: category text inside, value outside. */
export const LabelHorizontalBar: React.FC = () => {
  const leftPad = 8;
  const yScale = scaleBand<string>({
    domain: fullMonthData.map((d) => d.month),
    range: [0, innerHeight],
    padding: 0.28,
  });
  const xScale = scaleLinear<number>({
    domain: [0, 360],
    range: [0, innerWidth - 36],
    nice: true,
  });
  const bandwidth = yScale.bandwidth();

  return (
    <ChartFrame>
      <svg width={width} height={height} role="img" aria-label="Horizontal bar chart with labels">
        <Group left={margin.left} top={margin.top}>
          <GridColumns scale={xScale} height={innerHeight} numTicks={3} />
          {fullMonthData.map((d) => {
            const barY = asNumber(yScale(d.month));
            const barWidth = asNumber(xScale(d.value));
            return (
              <Group key={d.month}>
                <BarRounded
                  x={0}
                  y={barY}
                  width={barWidth}
                  height={bandwidth}
                  radius={barRadiusFull}
                  all
                  fill={seriesColor}
                />
                <Text
                  x={leftPad}
                  y={barY + bandwidth / 2}
                  verticalAnchor="middle"
                  fill={`contrast-color(${seriesColor})`}
                >
                  {d.month}
                </Text>
                <Text x={barWidth + 8} y={barY + bandwidth / 2} verticalAnchor="middle" textAnchor="start">
                  {d.value}
                </Text>
              </Group>
            );
          })}
        </Group>
      </svg>
    </ChartFrame>
  );
};

/** Horizontal mixed-color category bars (browser share). */
export const MixedHorizontalBar: React.FC = () => {
  const names = browserData.map((d) => d.name);
  const yScale = scaleBand<string>({
    domain: names,
    range: [0, innerHeight],
    padding: 0.3,
  });
  const xScale = scaleLinear<number>({
    domain: [0, 320],
    range: [0, innerWidth],
    nice: true,
  });
  const bandwidth = yScale.bandwidth();
  const colorScale = scaleOrdinal({
    domain: names,
    range: browserColors,
  });

  return (
    <ChartFrame>
      <svg width={width} height={height} role="img" aria-label="Mixed horizontal bar chart">
        <Group left={margin.left + 16} top={margin.top}>
          {browserData.map((d) => {
            const barY = asNumber(yScale(d.name));
            const barWidth = asNumber(xScale(d.value));
            return (
              <BarRounded
                key={d.name}
                x={0}
                y={barY}
                width={barWidth}
                height={bandwidth}
                radius={barRadiusFull}
                all
                fill={colorScale(d.name)}
              />
            );
          })}
          <AxisLeft scale={yScale} hideAxisLine hideTicks left={-8} />
        </Group>
      </svg>
    </ChartFrame>
  );
};

/** Vertical mixed-color bars with dashed active outline on hover. */
export const MixedBar: React.FC = () => {
  const [active, setActive] = React.useState<string | null>('Firefox');
  const names = browserData.map((d) => d.name);
  const xScale = scaleBand<string>({
    domain: names,
    range: [0, innerWidth],
    padding: 0.3,
  });
  const yScale = scaleLinear<number>({
    domain: [0, 320],
    range: [innerHeight, 0],
    nice: true,
  });
  const bandwidth = xScale.bandwidth();
  const colorScale = scaleOrdinal({
    domain: names,
    range: browserColors,
  });

  return (
    <ChartFrame>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label="Mixed bar chart with active state"
        onMouseLeave={() => setActive(null)}
      >
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={yScale} width={innerWidth} numTicks={3} />
          {browserData.map((d) => {
            const barX = asNumber(xScale(d.name));
            const barY = asNumber(yScale(d.value));
            const barHeight = Math.max(0, innerHeight - barY);
            const fill = colorScale(d.name);
            const isActive = active === d.name;
            return (
              <Group key={d.name} onMouseMove={() => setActive(d.name)}>
                <BarRounded x={barX} y={barY} width={bandwidth} height={barHeight} fill={fill} />
                {isActive ? (
                  <BarRounded
                    x={barX}
                    y={barY}
                    width={bandwidth}
                    height={barHeight}
                    fill="transparent"
                    stroke={fill}
                    strokeWidth={3}
                    strokeDasharray="4 4"
                    style={{ pointerEvents: 'none' }}
                  />
                ) : null}
              </Group>
            );
          })}
          <AxisBottom
            top={innerHeight}
            scale={xScale}
            tickValues={thinDomainTicks(names, innerWidth)}
            hideAxisLine
            hideTicks
          />
        </Group>
      </svg>
    </ChartFrame>
  );
};

/** Positive / negative bars with labels above or below. */
export const NegativeBar: React.FC = () => {
  const names = signedData.map((d) => d.month);
  const xScale = scaleBand<string>({
    domain: names,
    range: [0, innerWidth],
    padding: 0.35,
  });
  const yScale = scaleLinear<number>({
    domain: [-100, 100],
    range: [innerHeight, 0],
    nice: true,
  });
  const zeroY = asNumber(yScale(0));
  const bandwidth = xScale.bandwidth();

  return (
    <ChartFrame>
      <svg width={width} height={height} role="img" aria-label="Positive and negative bar chart">
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={yScale} width={innerWidth} numTicks={3} />
          <Bar x={0} y={zeroY} width={innerWidth} height={1} fill="var(--global-contrast)" />
          {signedData.map((d) => {
            const barX = asNumber(xScale(d.month));
            const valueY = asNumber(yScale(d.value));
            const positive = d.value >= 0;
            const color = positive ? seriesColor : seriesColorAlt;
            const barY = positive ? valueY : zeroY;
            const barHeight = Math.abs(valueY - zeroY);
            const labelY = positive ? valueY - 8 : valueY + 8;
            return (
              <Group key={d.month}>
                <Bar x={barX} y={barY} width={bandwidth} height={barHeight} fill={color} />
                <Text
                  x={barX + bandwidth / 2}
                  y={labelY}
                  textAnchor="middle"
                  verticalAnchor={positive ? 'end' : 'start'}
                  fill={color}
                >
                  {d.month}
                </Text>
              </Group>
            );
          })}
        </Group>
      </svg>
    </ChartFrame>
  );
};
