"use client";

import * as React from 'react';

import {
  Group,
  LegendItem,
  LegendLabel,
  LegendOrdinal,
  Pie,
  RectShape,
  Text,
  TooltipWithBounds,
  defaultStyles,
  localPoint,
  scaleOrdinal,
  useTooltip,
} from '@viraui/charts';
import { mutedLabel } from '../../../lib/chart-tokens';
import { browserData, monthDeviceData, type MonthDevicePoint } from '../../../lib/chart-story-data';
import { Select } from '@viraui/react';

type BrowserPoint = (typeof browserData)[number];

type TooltipDatum = {
  label: string;
  value: number;
  color: string;
  /** Optional secondary title (stacked ring). */
  title?: string;
};

const width = 420;
const height = 360;
const centerX = width / 2;
const centerY = height / 2 + 8;
const radius = 130;

const browserTotal = browserData.reduce((sum, d) => sum + d.value, 0);

const browserColors = [
  'var(--highlight-cyan)',
  'var(--highlight-blue)',
  'var(--highlight-indigo)',
  'var(--highlight-purple)',
  'var(--highlight-slate)',
];

const monthNames = monthDeviceData.map((d) => d.month);

const monthColors = [
  'var(--highlight-cyan)',
  'var(--highlight-blue)',
  'var(--highlight-indigo)',
  'var(--highlight-purple)',
  'var(--highlight-slate)',
  'var(--highlight-acid)',
];

const getBrowserValue = (d: BrowserPoint) => d.value;
const getDesktopValue = (d: MonthDevicePoint) => d.desktop;
const getMobileValue = (d: MonthDevicePoint) => d.mobile;

/** Keep input order (Chrome → Other / monthDevice order). */
const pieSortNull = null;

const colorScale = scaleOrdinal({
  domain: browserData.map((d) => d.name),
  range: browserColors,
});

const monthColorScale = scaleOrdinal({
  domain: monthNames,
  range: monthColors,
});

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

const cardTooltipStyle: React.CSSProperties = {
  ...defaultStyles,
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-2xs)',
  minInlineSize: 140,
  padding: 'var(--space-s)',
  pointerEvents: 'none',
};

const midAngle = (arc: { startAngle: number; endAngle: number }): number => (arc.startAngle + arc.endAngle) / 2;

/** d3 pie angle 0 = 12 o'clock; convert to cartesian offset. */
const polarOffset = (angle: number, distance: number): { x: number; y: number } => ({
  x: Math.cos(angle - Math.PI / 2) * distance,
  y: Math.sin(angle - Math.PI / 2) * distance,
});

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

/**
 * Donut hole readout: primary value stays on geometric center;
 * optional metric label sits just below (slightly decentered).
 */
const DonutCenterReadout: React.FC<{ value: number | string; label?: string }> = ({ value, label }) => (
  <>
    <Text
      textAnchor="middle"
      verticalAnchor="middle"
      y={0}
      fill="var(--global-foreground)"
      style={{ fontSize: 'var(--font-scale-h2)', fontWeight: 700, pointerEvents: 'none' }}
    >
      {value}
    </Text>
    {label ? (
      <Text
        textAnchor="middle"
        verticalAnchor="start"
        y={18}
        fill={mutedLabel}
        style={{ fontSize: 'var(--font-scale-body-s)', pointerEvents: 'none' }}
      >
        {label}
      </Text>
    ) : null}
  </>
);

const PillTooltipBody: React.FC<TooltipDatum> = ({ label, value, color }) => (
  <>
    <Swatch color={color} />
    <span style={{ color: mutedLabel }}>{label}</span>
    <span style={{ color: 'var(--global-foreground)', fontWeight: 600, marginInlineStart: 'auto' }}>{value}</span>
  </>
);

const CardTooltipBody: React.FC<TooltipDatum> = ({ title, label, value, color }) => (
  <>
    {title ? <div style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{title}</div> : null}
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-s)' }}>
      <Swatch color={color} tall />
      <span style={{ color: mutedLabel, flex: 1 }}>{label}</span>
      <span style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{value}</span>
    </div>
  </>
);



const ChartFrame: React.FC<{ children: React.ReactNode; width?: number }> = ({
  children,
  width: frameWidth = width,
}) => <div style={{ position: 'relative', inlineSize: frameWidth }}>{children}</div>;

/** Basic pie + pill tooltip on arc hover. */
export const SimplePie: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();

  return (
    <div style={{ inlineSize: width }}>
      <ChartFrame>
        <svg
          width={width}
          height={height}
          role="img"
          aria-label="Browser visitors pie chart"
          onMouseLeave={hideTooltip}
        >
          <Group top={centerY} left={centerX}>
            <Pie
              data={browserData}
              pieValue={getBrowserValue}
              pieSort={pieSortNull}
              pieSortValues={pieSortNull}
              outerRadius={radius}
              padAngle={0.02}
            >
              {({ arcs, path }) =>
                arcs.map((arc) => {
                  const color = colorScale(arc.data.name);
                  return (
                    <path
                      key={arc.data.name}
                      d={path(arc) ?? undefined}
                      fill={color}
                      stroke="var(--global-background)"
                      strokeWidth={2}
                      onMouseMove={(event) => {
                        const point = localPoint(event);
                        if (!point) return;
                        showTooltip({
                          tooltipData: { label: arc.data.name, value: arc.data.value, color },
                          tooltipLeft: point.x,
                          tooltipTop: point.y,
                        });
                      }}
                      onMouseLeave={hideTooltip}
                    />
                  );
                })
              }
            </Pie>
          </Group>
        </svg>
        {tooltipOpen && tooltipData ? (
          <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={pillTooltipStyle}>
            <PillTooltipBody {...tooltipData} />
          </TooltipWithBounds>
        ) : null}
      </ChartFrame>
    </div>
  );
};

/** External numeric labels + thin leader lines. */
export const LabelPie: React.FC<{ customTooltip?: boolean }> = ({ customTooltip }) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();
  const labelHeight = 400;
  const labelCenterY = labelHeight / 2;
  /** Elbow past rim. */
  const elbowRadius = radius + 28;
  /** Leader stops a few px short of the number. */
  const lineEndRadius = radius + 44;
  /** Number sits just past the line tip. */
  const labelRadius = radius + 52;

  return (
    <div style={{ inlineSize: width }}>
      <ChartFrame>
        <svg
          width={width}
          height={labelHeight}
          role="img"
          aria-label={customTooltip ? 'Pie chart with custom labels' : 'Pie chart with value labels'}
          onMouseLeave={hideTooltip}
        >
          <Group top={labelCenterY} left={centerX}>
            <Pie
              data={browserData}
              pieValue={getBrowserValue}
              pieSort={pieSortNull}
              pieSortValues={pieSortNull}
              outerRadius={radius}
              padAngle={0.02}
            >
              {({ arcs, path }) =>
                arcs.map((arc) => {
                  const color = colorScale(arc.data.name);
                  const angle = midAngle(arc);
                  const rim = polarOffset(angle, radius);
                  const elbow = polarOffset(angle, elbowRadius);
                  const lineEnd = polarOffset(angle, lineEndRadius);
                  const label = polarOffset(angle, labelRadius);
                  const anchor = label.x >= 0 ? 'start' : 'end';
                  return (
                    <g key={arc.data.name}>
                      <path
                        d={path(arc) ?? undefined}
                        fill={color}
                        stroke="var(--global-background)"
                        strokeWidth={2}
                        onMouseMove={(event) => {
                          const point = localPoint(event);
                          if (!point) return;
                          showTooltip({
                            tooltipData: {
                              label: customTooltip ? 'Visitors' : arc.data.name,
                              value: arc.data.value,
                              color,
                            },
                            tooltipLeft: point.x,
                            tooltipTop: point.y,
                          });
                        }}
                        onMouseLeave={hideTooltip}
                      />
                      <line
                        x1={rim.x}
                        y1={rim.y}
                        x2={elbow.x}
                        y2={elbow.y}
                        stroke={color}
                        strokeWidth={1}
                        style={{ pointerEvents: 'none' }}
                      />
                      <line
                        x1={elbow.x}
                        y1={elbow.y}
                        x2={lineEnd.x}
                        y2={lineEnd.y}
                        stroke={color}
                        strokeWidth={1}
                        style={{ pointerEvents: 'none' }}
                      />
                      <Text
                        x={label.x}
                        y={label.y}
                        textAnchor={anchor}
                        verticalAnchor="middle"
                        fill={color}
                        style={{ pointerEvents: 'none' }}
                      >
                        {arc.data.value}
                      </Text>
                    </g>
                  );
                })
              }
            </Pie>
          </Group>
        </svg>
        {tooltipOpen && tooltipData ? (
          <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={pillTooltipStyle}>
            <PillTooltipBody {...tooltipData} />
          </TooltipWithBounds>
        ) : null}
      </ChartFrame>
    </div>
  );
};

/** Category names drawn at arc centroids. */
export const LabelListPie: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();

  return (
    <div style={{ inlineSize: width }}>
      <ChartFrame>
        <svg
          width={width}
          height={height}
          role="img"
          aria-label="Pie chart with in-slice labels"
          onMouseLeave={hideTooltip}
        >
          <Group top={centerY} left={centerX}>
            <Pie
              data={browserData}
              pieValue={getBrowserValue}
              pieSort={pieSortNull}
              pieSortValues={pieSortNull}
              outerRadius={radius}
              padAngle={0.02}
            >
              {({ arcs, path }) =>
                arcs.map((arc) => {
                  const color = colorScale(arc.data.name);
                  const [cx, cy] = path.centroid(arc);
                  return (
                    <g key={arc.data.name}>
                      <path
                        d={path(arc) ?? undefined}
                        fill={color}
                        stroke="var(--global-background)"
                        strokeWidth={2}
                        onMouseMove={(event) => {
                          const point = localPoint(event);
                          if (!point) return;
                          showTooltip({
                            tooltipData: {
                              label: 'Visitors',
                              value: arc.data.value,
                              color,
                            },
                            tooltipLeft: point.x,
                            tooltipTop: point.y,
                          });
                        }}
                        onMouseLeave={hideTooltip}
                      />
                      <Text
                        x={cx}
                        y={cy}
                        textAnchor="middle"
                        verticalAnchor="middle"
                        fill={`contrast-color(${color})`}
                        style={{ pointerEvents: 'none', fontSize: 'var(--font-scale-body-s)', fontWeight: 600 }}
                      >
                        {arc.data.name}
                      </Text>
                    </g>
                  );
                })
              }
            </Pie>
          </Group>
        </svg>
        {tooltipOpen && tooltipData ? (
          <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={pillTooltipStyle}>
            <PillTooltipBody {...tooltipData} />
          </TooltipWithBounds>
        ) : null}
      </ChartFrame>
    </div>
  );
};

/** Pie + wrapping ordinal legend under the svg. */
export const LegendPie: React.FC = () => (
  <div style={{ inlineSize: width }}>
    <ChartFrame>
      <svg width={width} height={height - 40} role="img" aria-label="Pie chart with legend">
        <Group top={(height - 40) / 2 + 4} left={centerX}>
          <Pie
            data={browserData}
            pieValue={getBrowserValue}
            pieSort={pieSortNull}
            pieSortValues={pieSortNull}
            outerRadius={radius}
            padAngle={0.02}
            fill={(arc) => colorScale(arc.data.name)}
          />
        </Group>
      </svg>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          paddingBlockStart: 'var(--space-s)',
          rowGap: 'var(--space-xs)',
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
    </ChartFrame>
  </div>
);

/** Donut ring. Optional center total + metric label. */
export const DonutPie: React.FC<{ withText?: boolean }> = ({ withText }) => {
  const innerRadius = radius * 0.62;

  return (
    <div style={{ inlineSize: width }}>
      <ChartFrame>
        <svg
          width={width}
          height={height}
          role="img"
          aria-label={withText ? 'Donut chart with center total' : 'Donut chart'}
        >
          <Group top={centerY} left={centerX}>
            <Pie
              data={browserData}
              pieValue={getBrowserValue}
              pieSort={pieSortNull}
              pieSortValues={pieSortNull}
              innerRadius={innerRadius}
              outerRadius={radius}
              padAngle={0.02}
              fill={(arc) => colorScale(arc.data.name)}
            />
            {withText ? <DonutCenterReadout value={browserTotal} label="Visitors" /> : null}
          </Group>
        </svg>
      </ChartFrame>
    </div>
  );
};

/** Concentric rings: outer Desktop months, inner Mobile months. */
export const StackedPie: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();
  const outer = radius;
  const midGap = radius * 0.72;
  const innerOuter = radius * 0.62;
  const innerHole = radius * 0.34;

  const openArcTooltip = (event: React.MouseEvent, title: string, month: string, value: number) => {
    const point = localPoint(event);
    if (!point) return;
    showTooltip({
      tooltipData: {
        title,
        label: month,
        value,
        color: monthColorScale(month),
      },
      tooltipLeft: point.x,
      tooltipTop: point.y,
    });
  };

  return (
    <div style={{ inlineSize: width }}>
      <ChartFrame>
        <svg
          width={width}
          height={height}
          role="img"
          aria-label="Stacked concentric pie chart"
          onMouseLeave={hideTooltip}
        >
          <Group top={centerY} left={centerX}>
            <Pie
              data={monthDeviceData}
              pieValue={getDesktopValue}
              pieSort={pieSortNull}
              pieSortValues={pieSortNull}
              innerRadius={midGap}
              outerRadius={outer}
              padAngle={0.015}
            >
              {({ arcs, path }) =>
                arcs.map((arc) => {
                  const color = monthColorScale(arc.data.month);
                  return (
                    <path
                      key={`desktop-${arc.data.month}`}
                      d={path(arc) ?? undefined}
                      fill={color}
                      stroke="var(--global-background)"
                      strokeWidth={3}
                      onMouseMove={(event) => openArcTooltip(event, 'Desktop', arc.data.month, arc.data.desktop)}
                      onMouseLeave={hideTooltip}
                    />
                  );
                })
              }
            </Pie>
            <Pie
              data={monthDeviceData}
              pieValue={getMobileValue}
              pieSort={pieSortNull}
              pieSortValues={pieSortNull}
              innerRadius={innerHole}
              outerRadius={innerOuter}
              padAngle={0.015}
            >
              {({ arcs, path }) =>
                arcs.map((arc) => {
                  const color = monthColorScale(arc.data.month);
                  return (
                    <path
                      key={`mobile-${arc.data.month}`}
                      d={path(arc) ?? undefined}
                      fill={color}
                      stroke="var(--global-background)"
                      strokeWidth={3}
                      onMouseMove={(event) => openArcTooltip(event, 'Mobile', arc.data.month, arc.data.mobile)}
                      onMouseLeave={hideTooltip}
                    />
                  );
                })
              }
            </Pie>
          </Group>
        </svg>
        {tooltipOpen && tooltipData ? (
          <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={cardTooltipStyle}>
            <CardTooltipBody {...tooltipData} />
          </TooltipWithBounds>
        ) : null}
      </ChartFrame>
    </div>
  );
};

/** Donut with Vira Select + exploded active arc + centered readout. */
export const InteractivePie: React.FC = () => {
  const fallbackMonth = monthDeviceData[1]?.month ?? monthDeviceData[0]?.month ?? '';
  const [selectedMonth, setSelectedMonth] = React.useState(fallbackMonth);
  const selected =
    monthDeviceData.find((d) => d.month === selectedMonth) ??
    monthDeviceData[0] ??
    ({ month: fallbackMonth, desktop: 0, mobile: 0 } satisfies MonthDevicePoint);
  const selectedValue = selected.desktop;
  const innerRadius = radius * 0.58;
  const explode = 14;

  return (
    <div style={{ inlineSize: width }}>
      <ChartFrame>
        {/* role=group: arc hit targets are focusable — role=img nests interactive (axe). */}
        <svg width={width} height={height} role="group" aria-label="Interactive donut chart by month">
          <Group top={centerY} left={centerX}>
            <Pie
              data={monthDeviceData}
              pieValue={getDesktopValue}
              pieSort={pieSortNull}
              pieSortValues={pieSortNull}
              innerRadius={innerRadius}
              outerRadius={radius}
              padAngle={0.02}
            >
              {({ arcs, path }) =>
                arcs.map((arc) => {
                  const active = arc.data.month === selectedMonth;
                  const color = monthColorScale(arc.data.month);
                  const offset = active ? polarOffset(midAngle(arc), explode) : { x: 0, y: 0 };
                  return (
                    <g
                      key={arc.data.month}
                      transform={`translate(${offset.x}, ${offset.y})`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedMonth(arc.data.month)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setSelectedMonth(arc.data.month);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-pressed={active}
                      aria-label={`${arc.data.month}, ${arc.data.desktop} visitors`}
                    >
                      <path d={path(arc) ?? undefined} fill={color} stroke="var(--global-background)" strokeWidth={2} />
                    </g>
                  );
                })
              }
            </Pie>
            <DonutCenterReadout value={selectedValue} label="Visitors" />
          </Group>
        </svg>
      </ChartFrame>
    </div>
  );
};
