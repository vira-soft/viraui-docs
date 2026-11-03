"use client";

import * as React from 'react';

import {
  Circle,
  Group,
  LegendItem,
  LegendLabel,
  LegendOrdinal,
  Line,
  LineRadial,
  Point,
  RectShape,
  Text,
  TooltipWithBounds,
  defaultStyles,
  localPoint,
  scaleLinear,
  scaleOrdinal,
  useTooltip,
} from '@viraui/charts';
import { contrastStroke, mutedLabel, seriesFill, seriesStroke } from '../../../lib/chart-tokens';
import { monthDeviceData, type MonthDevicePoint } from '../../../lib/chart-story-data';

type SeriesKey = 'desktop' | 'mobile';

type TooltipRow = {
  label: string;
  value: number;
  color: string;
};

type TooltipDatum = {
  title?: string;
  rows: TooltipRow[];
};

type GridKind = 'polygon' | 'circle' | 'none';
type DotMode = 'none' | 'always' | 'hover';
type SeriesFillMode = 'fill' | 'stroke';

type RadarOptions = {
  title: string;
  subtitle?: string;
  grid?: GridKind;
  /** Radial spokes from center to vertices. Ignored when `grid="none"`. */
  spokes?: boolean;
  /** Soft fill under outermost grid ring/circle. */
  gridFilled?: boolean;
  levels?: number;
  /** Which series to draw. */
  series?: SeriesKey[];
  seriesPaint?: SeriesFillMode;
  dots?: DotMode;
  /** Month only, or `desktop / mobile` above month. */
  labels?: 'month' | 'values';
  legend?: boolean;
  tooltipStyle?: 'card' | 'pill';
};

const width = 420;
const height = 380;
const margin = { top: 48, right: 72, bottom: 56, left: 72 };
const levelsDefault = 5;
const degrees = 360;

const seriesMeta: Record<SeriesKey, { label: string; stroke: string; fill: string }> = {
  desktop: {
    label: 'Desktop',
    stroke: 'var(--highlight-cyan)',
    fill: 'oklab(from var(--highlight-cyan) l a b / 28%)',
  },
  mobile: {
    label: 'Mobile',
    stroke: seriesStroke,
    fill: seriesFill,
  },
};

const maxValue = Math.max(...monthDeviceData.flatMap((d) => [d.desktop, d.mobile]));

const legendScale = scaleOrdinal<string, string>({
  domain: ['Desktop', 'Mobile'],
  range: [seriesMeta.desktop.stroke, seriesMeta.mobile.stroke],
});

const zeroPoint = new Point({ x: 0, y: 0 });

const genAngles = (length: number) =>
  Array.from({ length: length + 1 }, (_, i) => ({
    angle: i * (degrees / length) + (length % 2 === 0 ? 0 : degrees / length / 2),
  }));

const genAxisPoints = (length: number, radius: number) => {
  const step = (Math.PI * 2) / length;
  return Array.from({ length }, (_, i) => ({
    x: radius * Math.sin(i * step),
    y: radius * Math.cos(i * step),
  }));
};

const genSeriesPolygon = (
  data: MonthDevicePoint[],
  scale: (n: number) => number,
  getValue: (d: MonthDevicePoint) => number,
): { points: { x: number; y: number }[]; pointString: string } => {
  const step = (Math.PI * 2) / data.length;
  const points = data.map((d, i) => {
    const r = scale(getValue(d));
    return { x: r * Math.sin(i * step), y: r * Math.cos(i * step) };
  });
  const pointString = points.map((p) => `${p.x},${p.y}`).join(' ');
  return { points, pointString };
};

const labelAnchor = (index: number, count: number): 'start' | 'middle' | 'end' => {
  const angle = (index / count) * Math.PI * 2;
  const x = Math.sin(angle);
  if (Math.abs(x) < 0.35) return 'middle';
  return x > 0 ? 'start' : 'end';
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

const cardTooltipStyle: React.CSSProperties = {
  ...defaultStyles,
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-2xs)',
  minInlineSize: 148,
  padding: 'var(--space-s)',
  pointerEvents: 'none',
};

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


const ChartFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'relative', inlineSize: width }}>{children}</div>
);

export const RadarChart: React.FC<RadarOptions> = ({
  title,
  subtitle,
  grid = 'polygon',
  spokes = true,
  gridFilled = false,
  levels = levelsDefault,
  series = ['desktop'],
  seriesPaint = 'fill',
  dots = 'hover',
  labels = 'month',
  legend = false,
  tooltipStyle = 'card',
}) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const radius = Math.min(xMax, yMax) / 2;
  const count = monthDeviceData.length;

  const radialScale = scaleLinear<number>({
    range: [0, Math.PI * 2],
    domain: [degrees, 0],
  });

  const yScale = scaleLinear<number>({
    range: [0, radius],
    domain: [0, maxValue],
  });

  const webs = genAngles(count);
  const axisPoints = genAxisPoints(count, radius);
  const labelPoints = genAxisPoints(count, radius + (labels === 'values' ? 28 : 18));

  const seriesPolygons = series.map((key) => ({
    key,
    ...seriesMeta[key],
    ...genSeriesPolygon(
      monthDeviceData,
      (n) => yScale(n) ?? 0,
      (d) => d[key],
    ),
  }));

  const showTooltipForIndex = (index: number, event: React.MouseEvent | React.FocusEvent) => {
    const point = 'clientX' in event ? localPoint(event) : null;
    const row = monthDeviceData[index];
    if (!row) return;
    showTooltip({
      tooltipData: {
        title: tooltipStyle === 'card' ? row.month : undefined,
        rows: series.map((key) => ({
          label: seriesMeta[key].label,
          value: row[key],
          color: seriesMeta[key].stroke,
        })),
      },
      tooltipLeft: point?.x ?? width / 2 + axisPoints[index]!.x,
      tooltipTop: point?.y ?? height / 2 - margin.top / 2 + axisPoints[index]!.y,
    });
    setHoverIndex(index);
  };

  const clearHover = () => {
    hideTooltip();
    setHoverIndex(null);
  };

  return (
    <div style={{ inlineSize: width }}>
      <ChartFrame>
        {/* role=group: hit targets are focusable buttons — role=img nests interactive (axe). */}
        <svg width={width} height={height} role="group" aria-label={`${title} radar chart`} onMouseLeave={clearHover}>
          <Group top={height / 2 - margin.top / 4} left={width / 2}>
            {gridFilled && grid === 'circle' ? (
              <Circle cx={0} cy={0} r={radius} fill="oklab(from var(--highlight-blue) l a b / 10%)" stroke="none" />
            ) : null}
            {gridFilled && grid === 'polygon' ? (
              <polygon
                points={genAxisPoints(count, radius)
                  .map((p) => `${p.x},${p.y}`)
                  .join(' ')}
                fill="oklab(from var(--highlight-blue) l a b / 10%)"
                stroke="none"
              />
            ) : null}

            {grid === 'polygon'
              ? Array.from({ length: levels }, (_, level) => {
                  const ringRadius = ((level + 1) * radius) / levels;
                  return (
                    <LineRadial
                      key={`web-${ringRadius}`}
                      data={webs}
                      angle={(d) => radialScale(d.angle) ?? 0}
                      radius={ringRadius}
                      fill="none"
                      stroke={contrastStroke}
                      strokeWidth={1}
                    />
                  );
                })
              : null}

            {grid === 'circle'
              ? Array.from({ length: levels }, (_, level) => {
                  const ringRadius = ((level + 1) * radius) / levels;
                  return (
                    <Circle
                      key={`ring-${ringRadius}`}
                      cx={0}
                      cy={0}
                      r={ringRadius}
                      fill="none"
                      stroke={contrastStroke}
                      strokeWidth={1}
                    />
                  );
                })
              : null}

            {grid !== 'none' && spokes
              ? axisPoints.map((point, i) => (
                  <Line
                    key={`spoke-${monthDeviceData[i]?.month ?? point.x}`}
                    from={zeroPoint}
                    to={point}
                    stroke={contrastStroke}
                    strokeWidth={1}
                  />
                ))
              : null}

            {seriesPolygons.map((serie) => (
              <polygon
                key={serie.key}
                points={serie.pointString}
                fill={seriesPaint === 'fill' ? serie.fill : 'none'}
                stroke={serie.stroke}
                strokeWidth={2}
              />
            ))}

            {seriesPolygons.map((serie) =>
              serie.points.map((point, i) => {
                const month = monthDeviceData[i]?.month;
                if (!month) return null;
                const active = hoverIndex === i;
                const showDot = dots === 'always' || (dots === 'hover' && active);
                if (!showDot) return null;
                return (
                  <Circle
                    key={`${serie.key}-dot-${month}`}
                    cx={point.x}
                    cy={point.y}
                    r={active ? 5 : 4}
                    fill={serie.stroke}
                    stroke="var(--global-background)"
                    strokeWidth={1}
                    style={{ pointerEvents: 'none' }}
                  />
                );
              }),
            )}

            {/* Hit targets — outer series vertices */}
            {(seriesPolygons[seriesPolygons.length - 1]?.points ?? []).map((point, i) => {
              const row = monthDeviceData[i];
              if (!row) return null;
              return (
                <Circle
                  key={`hit-${row.month}`}
                  cx={point.x}
                  cy={point.y}
                  r={14}
                  fill="transparent"
                  stroke="none"
                  style={{ cursor: 'pointer' }}
                  onMouseMove={(event) => showTooltipForIndex(i, event)}
                  onFocus={(event) => showTooltipForIndex(i, event)}
                  onBlur={clearHover}
                  role="button"
                  tabIndex={0}
                  aria-label={`${row.month}: ${series.map((key) => `${seriesMeta[key].label} ${row[key]}`).join(', ')}`}
                />
              );
            })}

            {monthDeviceData.map((d, i) => {
              const point = labelPoints[i];
              if (!point) return null;
              const anchor = labelAnchor(i, count);
              if (labels === 'values') {
                const valueText = series.map((key) => d[key]).join(' / ');
                return (
                  <React.Fragment key={d.month}>
                    <Text
                      x={point.x}
                      y={point.y - 10}
                      textAnchor={anchor}
                      verticalAnchor="end"
                      fill="var(--global-foreground)"
                      style={{ fontSize: 'var(--font-scale-body-s)', fontWeight: 600, pointerEvents: 'none' }}
                    >
                      {valueText}
                    </Text>
                    <Text
                      x={point.x}
                      y={point.y + 2}
                      textAnchor={anchor}
                      verticalAnchor="start"
                      fill={mutedLabel}
                      style={{ fontSize: 'var(--font-scale-body-s)', pointerEvents: 'none' }}
                    >
                      {d.month}
                    </Text>
                  </React.Fragment>
                );
              }
              return (
                <Text
                  key={d.month}
                  x={point.x}
                  y={point.y}
                  textAnchor={anchor}
                  verticalAnchor="middle"
                  fill={mutedLabel}
                  style={{ fontSize: 'var(--font-scale-body-s)', pointerEvents: 'none' }}
                >
                  {d.month}
                </Text>
              );
            })}
          </Group>
        </svg>

        {tooltipOpen && tooltipData ? (
          <TooltipWithBounds
            top={tooltipTop}
            left={tooltipLeft}
            style={tooltipStyle === 'pill' ? pillTooltipStyle : cardTooltipStyle}
          >
            {tooltipStyle === 'pill' ? (
              tooltipData.rows.map((row) => (
                <React.Fragment key={row.label}>
                  <Swatch color={row.color} />
                  <span style={{ color: mutedLabel }}>{row.label}</span>
                  <span style={{ color: 'var(--global-foreground)', fontWeight: 600, marginInlineStart: 'auto' }}>
                    {row.value}
                  </span>
                </React.Fragment>
              ))
            ) : (
              <>
                {tooltipData.title ? (
                  <div style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{tooltipData.title}</div>
                ) : null}
                {tooltipData.rows.map((row) => (
                  <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-s)' }}>
                    <Swatch color={row.color} tall />
                    <span style={{ color: mutedLabel, flex: 1 }}>{row.label}</span>
                    <span style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{row.value}</span>
                  </div>
                ))}
              </>
            )}
          </TooltipWithBounds>
        ) : null}
      </ChartFrame>

      {legend ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginBlockStart: 'var(--space-m)' }}>
          <LegendOrdinal scale={legendScale} direction="row" labelMargin="0">
            {(labelsList) =>
              labelsList.map((label) => (
                <LegendItem key={label.text} margin="0 var(--space-m) 0 0">
                  <RectShape width={10} height={10} fill={label.value} />
                  <LegendLabel align="left" margin="0 0 0 var(--space-s)">
                    {label.text}
                  </LegendLabel>
                </LegendItem>
              ))
            }
          </LegendOrdinal>
        </div>
      ) : null}
    </div>
  );
};
