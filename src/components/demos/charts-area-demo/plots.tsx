"use client";

import type * as React from 'react';

import {
  AreaClosed,
  AreaStack,
  AxisBottom,
  AxisLeft,
  Circle,
  GridRows,
  Group,
  LegendItem,
  LegendLabel,
  LegendOrdinal,
  Line,
  LinePath,
  ParentSize,
  RectShape,
  TooltipWithBounds,
  curveLinear,
  curveMonotoneX,
  curveStep,
  defaultStyles,
  localPoint,
  scaleLinear,
  scaleOrdinal,
  scalePoint,
  useTooltip,
} from '@viraui/charts';
import { mutedLabel, seriesStroke } from '../../../lib/chart-tokens';
import {
  denseDualData as denseData,
  desktopData,
  monthDomain,
  monthTitles,
  multiData,
  stackData,
  type MultiPoint,
  type StackPoint,
} from '../../../lib/chart-story-data';

/** Stacked band fill — translucent solid (no gradient). */
const stackFill = (color: string): string => `oklab(from ${color} l a b / 24%)`;

type TooltipRow = {
  label: string;
  value: number;
  color: string;
};

type TooltipDatum = {
  title?: string;
  rows: TooltipRow[];
  /** Plot-space x for hover marks (inner coords). */
  markX?: number;
  /** Plot-space y per row for hover marks. */
  markYs?: number[];
};

type XScale = ReturnType<typeof scalePoint<string>>;
type YScale = ReturnType<typeof scaleLinear<number>>;

const width = 560;
const height = 320;
const margin = { top: 28, right: 24, bottom: 40, left: 24 };
const axesMargin = { top: 28, right: 24, bottom: 40, left: 48 };
const denseMargin = { top: 16, right: 16, bottom: 36, left: 16 };
const denseHeight = 360;
const denseLabelMinPx = 72;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const seriesColor = seriesStroke;
const seriesColorAlt = 'var(--highlight-cyan)';
const seriesColorOther = 'var(--highlight-indigo)';

const stackKeys = ['desktop', 'mobile', 'other'] as const;
const multiKeys = ['desktop', 'mobile'] as const;

const seriesLabel: Record<string, string> = {
  desktop: 'Desktop',
  mobile: 'Mobile',
  other: 'Other',
};

const seriesColorMap: Record<string, string> = {
  desktop: seriesColorAlt,
  mobile: seriesColor,
  other: seriesColorOther,
};

/** Thin point-domain ticks so labels fit `plotWidth`. */
const thinPointTicks = (domain: string[], plotWidth: number, minLabelPx = denseLabelMinPx): string[] => {
  if (domain.length === 0 || plotWidth <= 0) {
    return [];
  }
  const maxTicks = Math.max(2, Math.floor(plotWidth / minLabelPx));
  if (domain.length <= maxTicks) {
    return domain.slice();
  }
  const step = Math.ceil(domain.length / maxTicks);
  return domain.filter((_, i) => i % step === 0);
};

const denseDomain = denseData.map((d) => d.key);
const denseByKey = new Map(denseData.map((d) => [d.key, d]));

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
  gap: 'var(--space-s)',
  minInlineSize: 160,
  padding: 'var(--space-s)',
  pointerEvents: 'none',
};

const asNumber = (value: unknown): number => (value == null ? 0 : Number(value));

const atX = (scale: XScale, key: string): number => asNumber(scale(key));

const atY = (scale: YScale, value: number): number => asNumber(scale(value));

const nearestIndex = (x: number, domain: string[], xScale: XScale): number => {
  let best = 0;
  let bestDist = Number.POSITIVE_INFINITY;
  for (let i = 0; i < domain.length; i += 1) {
    const key = domain[i];
    if (key !== undefined) {
      const dist = Math.abs(atX(xScale, key) - x);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
  }
  return best;
};

type SwatchProps = {
  color: string;
  tall?: boolean;
};

const Swatch: React.FC<SwatchProps> = ({ color, tall }) => (
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

type PillTooltipBodyProps = {
  label: string;
  value: number;
  color: string;
  tall?: boolean;
};

const PillTooltipBody: React.FC<PillTooltipBodyProps> = ({ label, value, color, tall }) => (
  <>
    <Swatch color={color} tall={tall} />
    <span style={{ color: mutedLabel }}>{label}</span>
    <span style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{value}</span>
  </>
);

const CardTooltipBody: React.FC<TooltipDatum> = ({ title, rows }) => (
  <>
    {title ? <div style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{title}</div> : null}
    {rows.map((row) => (
      <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-s)' }}>
        <Swatch color={row.color} tall />
        <span style={{ color: mutedLabel, flex: 1 }}>{row.label}</span>
        <span style={{ color: 'var(--global-foreground)', fontWeight: 600 }}>{row.value}</span>
      </div>
    ))}
  </>
);

type AreaShellProps = {
  ariaLabel: string;
  children: (args: { xScale: XScale; yScale: YScale }) => React.ReactNode;
  yMax?: number;
  leftMargin?: number;
  showYAxis?: boolean;
  onMove?: (args: { event: React.MouseEvent<SVGSVGElement>; xScale: XScale; yScale: YScale }) => void;
  onLeave?: () => void;
};

const AreaShell: React.FC<AreaShellProps> = ({
  ariaLabel,
  children,
  yMax = 360,
  leftMargin = margin.left,
  showYAxis = false,
  onMove,
  onLeave,
}) => {
  const plotWidth = width - leftMargin - margin.right;
  const xScale = scalePoint<string>({
    domain: monthDomain,
    range: [0, plotWidth],
  });
  const yScale = scaleLinear<number>({
    domain: [0, yMax],
    range: [innerHeight, 0],
    nice: true,
  });

  return (
    <svg
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
      onMouseMove={onMove ? (event) => onMove({ event, xScale, yScale }) : undefined}
      onMouseLeave={onLeave}
    >
      <Group left={leftMargin} top={margin.top}>
        <GridRows scale={yScale} width={plotWidth} numTicks={showYAxis ? 3 : 5} />
        {children({ xScale, yScale })}
        {showYAxis ? <AxisLeft scale={yScale} hideAxisLine hideTicks numTicks={3} /> : null}
        <AxisBottom top={innerHeight} scale={xScale} hideAxisLine hideTicks />
      </Group>
    </svg>
  );
};

const ChartFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'relative', inlineSize: width }}>{children}</div>
);

type HoverMarksProps = {
  open: boolean;
  points: Array<{ cx: number; cy: number; color: string }>;
};

const HoverMarks: React.FC<HoverMarksProps> = ({ open, points }) => {
  if (!open || points.length === 0) {
    return null;
  }
  return (
    <>
      {points.map((point) => (
        <Circle
          key={`${point.cx}-${point.cy}-${point.color}`}
          cx={point.cx}
          cy={point.cy}
          r={5}
          fill={point.color}
          stroke="var(--global-background)"
          strokeWidth={2}
          style={{ pointerEvents: 'none' }}
        />
      ))}
    </>
  );
};

type HoverGuideProps = {
  open: boolean;
  x?: number;
  height: number;
};

const HoverGuide: React.FC<HoverGuideProps> = ({ open, x, height: guideHeight }) => {
  if (!open || x == null) {
    return null;
  }
  return (
    <Line
      from={{ x, y: 0 }}
      to={{ x, y: guideHeight }}
      stroke="oklab(from var(--global-contrast) l a b / 32%)"
      strokeWidth={1}
      style={{ pointerEvents: 'none' }}
    />
  );
};

const showSingleTooltip = (
  event: React.MouseEvent<SVGSVGElement>,
  xScale: XScale,
  yScale: YScale,
  showTooltip: (args: { tooltipData: TooltipDatum; tooltipLeft: number; tooltipTop: number }) => void,
  options?: { title?: boolean; leftMargin?: number },
) => {
  const point = localPoint(event);
  if (!point) {
    return;
  }
  const left = options?.leftMargin ?? margin.left;
  const index = nearestIndex(point.x - left, monthDomain, xScale);
  const d = desktopData[index];
  if (!d) {
    return;
  }
  const markX = atX(xScale, d.month);
  const markY = atY(yScale, d.value);
  showTooltip({
    tooltipData: {
      title: options?.title ? (monthTitles[d.month] ?? d.month) : undefined,
      rows: [{ label: 'Desktop', value: d.value, color: seriesColor }],
      markX,
      markYs: [markY],
    },
    tooltipLeft: left + markX,
    tooltipTop: margin.top + markY,
  });
};

const SeriesLegend: React.FC<{ keys: readonly string[] }> = ({ keys }) => {
  const colorScale = scaleOrdinal({
    domain: keys.map((k) => seriesLabel[k] ?? k),
    range: keys.map((k) => seriesColorMap[k] ?? seriesColor),
  });
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-m)' }}>
      <LegendOrdinal scale={colorScale} direction="row">
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

/** Single-series monotone area + tall-pill tooltip. */
export const DefaultArea: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();

  return (
    <ChartFrame>
      <AreaShell
        ariaLabel="Area chart"
        onLeave={hideTooltip}
        onMove={({ event, xScale, yScale }) => showSingleTooltip(event, xScale, yScale, showTooltip, { title: true })}
      >
        {({ xScale, yScale }) => (
          <>
            <AreaClosed
              data={desktopData}
              x={(d) => atX(xScale, d.month)}
              y={(d) => atY(yScale, d.value)}
              yScale={yScale}
              curve={curveMonotoneX}
            />
            <HoverMarks
              open={tooltipOpen}
              points={
                tooltipData?.markX != null && tooltipData.markYs?.[0] != null
                  ? [{ cx: tooltipData.markX, cy: tooltipData.markYs[0], color: seriesColor }]
                  : []
              }
            />
          </>
        )}
      </AreaShell>
      {tooltipOpen && tooltipData?.rows[0] ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={pillTooltipStyle}>
          <PillTooltipBody
            label={tooltipData.rows[0].label}
            value={tooltipData.rows[0].value}
            color={tooltipData.rows[0].color}
            tall
          />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

/** Linear interpolation area. */
export const LinearArea: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();

  return (
    <ChartFrame>
      <AreaShell
        ariaLabel="Linear area chart"
        onLeave={hideTooltip}
        onMove={({ event, xScale, yScale }) => showSingleTooltip(event, xScale, yScale, showTooltip)}
      >
        {({ xScale, yScale }) => (
          <>
            <AreaClosed
              data={desktopData}
              x={(d) => atX(xScale, d.month)}
              y={(d) => atY(yScale, d.value)}
              yScale={yScale}
              curve={curveLinear}
            />
            <HoverMarks
              open={tooltipOpen}
              points={
                tooltipData?.markX != null && tooltipData.markYs?.[0] != null
                  ? [{ cx: tooltipData.markX, cy: tooltipData.markYs[0], color: seriesColor }]
                  : []
              }
            />
          </>
        )}
      </AreaShell>
      {tooltipOpen && tooltipData?.rows[0] ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={pillTooltipStyle}>
          <PillTooltipBody
            label={tooltipData.rows[0].label}
            value={tooltipData.rows[0].value}
            color={tooltipData.rows[0].color}
          />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

/** Step area. */
export const StepArea: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();

  return (
    <ChartFrame>
      <AreaShell
        ariaLabel="Step area chart"
        onLeave={hideTooltip}
        onMove={({ event, xScale, yScale }) => showSingleTooltip(event, xScale, yScale, showTooltip)}
      >
        {({ xScale, yScale }) => (
          <>
            <AreaClosed
              data={desktopData}
              x={(d) => atX(xScale, d.month)}
              y={(d) => atY(yScale, d.value)}
              yScale={yScale}
              curve={curveStep}
            />
            <HoverMarks
              open={tooltipOpen}
              points={
                tooltipData?.markX != null && tooltipData.markYs?.[0] != null
                  ? [{ cx: tooltipData.markX, cy: tooltipData.markYs[0], color: seriesColor }]
                  : []
              }
            />
          </>
        )}
      </AreaShell>
      {tooltipOpen && tooltipData?.rows[0] ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={pillTooltipStyle}>
          <PillTooltipBody
            label={tooltipData.rows[0].label}
            value={tooltipData.rows[0].value}
            color={tooltipData.rows[0].color}
          />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

/** Overlapping (not stacked) areas — package AreaClosed default = gradient + top edge. */
export const GradientArea: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();

  return (
    <ChartFrame>
      <AreaShell
        ariaLabel="Gradient area chart"
        yMax={400}
        onLeave={hideTooltip}
        onMove={({ event, xScale, yScale }) => {
          const point = localPoint(event);
          if (!point) {
            return;
          }
          const index = nearestIndex(point.x - margin.left, monthDomain, xScale);
          const d = multiData[index];
          if (!d) {
            return;
          }
          const markX = atX(xScale, d.month);
          showTooltip({
            tooltipData: {
              title: monthTitles[d.month] ?? d.month,
              rows: [
                { label: 'Mobile', value: d.mobile, color: seriesColor },
                { label: 'Desktop', value: d.desktop, color: seriesColorAlt },
              ],
              markX,
              markYs: [atY(yScale, d.mobile), atY(yScale, d.desktop)],
            },
            tooltipLeft: margin.left + markX,
            tooltipTop: margin.top + atY(yScale, Math.max(d.mobile, d.desktop)),
          });
        }}
      >
        {({ xScale, yScale }) => (
          <>
            <AreaClosed
              data={multiData}
              x={(d) => atX(xScale, d.month)}
              y={(d) => atY(yScale, d.mobile)}
              yScale={yScale}
              curve={curveMonotoneX}
              stroke={seriesColor}
            />
            <AreaClosed
              data={multiData}
              x={(d) => atX(xScale, d.month)}
              y={(d) => atY(yScale, d.desktop)}
              yScale={yScale}
              curve={curveMonotoneX}
              stroke={seriesColorAlt}
            />
            <HoverMarks
              open={tooltipOpen}
              points={
                tooltipData?.markX != null && tooltipData.markYs
                  ? tooltipData.rows.map((row, i) => ({
                      cx: tooltipData.markX ?? 0,
                      cy: tooltipData.markYs?.[i] ?? 0,
                      color: row.color,
                    }))
                  : []
              }
            />
          </>
        )}
      </AreaShell>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={cardTooltipStyle}>
          <CardTooltipBody {...tooltipData} />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

/** Stacked areas + bottom legend. */
export const StackedArea: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();
  const colorScale = scaleOrdinal<string, string>({
    domain: [...multiKeys],
    range: [seriesColorAlt, seriesColor],
  });

  return (
    <ChartFrame>
      <AreaShell
        ariaLabel="Stacked area chart"
        yMax={600}
        onLeave={hideTooltip}
        onMove={({ event, xScale, yScale }) => {
          const point = localPoint(event);
          if (!point) {
            return;
          }
          const index = nearestIndex(point.x - margin.left, monthDomain, xScale);
          const d = multiData[index];
          if (!d) {
            return;
          }
          const markX = atX(xScale, d.month);
          // keys=['desktop','mobile'] → desktop bottom, mobile on top
          const desktopTopY = atY(yScale, d.desktop);
          const mobileTopY = atY(yScale, d.desktop + d.mobile);
          showTooltip({
            tooltipData: {
              title: monthTitles[d.month] ?? d.month,
              rows: [
                { label: 'Mobile', value: d.mobile, color: seriesColor },
                { label: 'Desktop', value: d.desktop, color: seriesColorAlt },
              ],
              markX,
              markYs: [mobileTopY, desktopTopY],
            },
            tooltipLeft: margin.left + markX,
            tooltipTop: margin.top + mobileTopY,
          });
        }}
      >
        {({ xScale, yScale }) => (
          <>
            <AreaStack
              data={multiData}
              keys={[...multiKeys]}
              x={(d) => atX(xScale, (d.data as MultiPoint).month)}
              y0={(d) => atY(yScale, d[0])}
              y1={(d) => atY(yScale, d[1])}
              color={(key) => colorScale(String(key))}
              curve={curveMonotoneX}
            >
              {({ stacks, path }) =>
                stacks.map((stack) => (
                  <path
                    key={`stack-${stack.key}`}
                    d={path(stack) || ''}
                    fill={stackFill(colorScale(String(stack.key)))}
                  />
                ))
              }
            </AreaStack>
            <LinePath
              data={multiData}
              x={(d) => atX(xScale, d.month)}
              y={(d) => atY(yScale, d.desktop)}
              curve={curveMonotoneX}
              stroke={seriesColorAlt}
            />
            <LinePath
              data={multiData}
              x={(d) => atX(xScale, d.month)}
              y={(d) => atY(yScale, d.desktop + d.mobile)}
              curve={curveMonotoneX}
              stroke={seriesColor}
            />
            <HoverGuide open={tooltipOpen} x={tooltipData?.markX} height={innerHeight} />
            <HoverMarks
              open={tooltipOpen}
              points={
                tooltipData?.markX != null && tooltipData.markYs
                  ? tooltipData.rows.map((row, i) => ({
                      cx: tooltipData.markX ?? 0,
                      cy: tooltipData.markYs?.[i] ?? 0,
                      color: row.color,
                    }))
                  : []
              }
            />
          </>
        )}
      </AreaShell>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={cardTooltipStyle}>
          <CardTooltipBody {...tooltipData} />
        </TooltipWithBounds>
      ) : null}
      <SeriesLegend keys={['desktop', 'mobile']} />
    </ChartFrame>
  );
};

/** 100% stacked (expand offset) with three series. */
export const StackedExpandedArea: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();
  const colorScale = scaleOrdinal<string, string>({
    domain: [...stackKeys],
    range: [seriesColorAlt, seriesColor, seriesColorOther],
  });

  return (
    <ChartFrame>
      <AreaShell
        ariaLabel="Stacked expanded area chart"
        yMax={1}
        onLeave={hideTooltip}
        onMove={({ event, xScale, yScale }) => {
          const point = localPoint(event);
          if (!point) {
            return;
          }
          const index = nearestIndex(point.x - margin.left, monthDomain, xScale);
          const d = stackData[index];
          if (!d) {
            return;
          }
          const markX = atX(xScale, d.month);
          const total = d.desktop + d.mobile + d.other;
          const desktopShare = d.desktop / total;
          const mobileShare = d.mobile / total;
          const otherShare = d.other / total;
          showTooltip({
            tooltipData: {
              title: monthTitles[d.month] ?? d.month,
              rows: [
                { label: 'Other', value: d.other, color: seriesColorOther },
                { label: 'Mobile', value: d.mobile, color: seriesColor },
                { label: 'Desktop', value: d.desktop, color: seriesColorAlt },
              ],
              markX,
              markYs: [
                atY(yScale, desktopShare + mobileShare + otherShare),
                atY(yScale, desktopShare + mobileShare),
                atY(yScale, desktopShare),
              ],
            },
            tooltipLeft: margin.left + markX,
            tooltipTop: margin.top + atY(yScale, 0.5),
          });
        }}
      >
        {({ xScale, yScale }) => (
          <>
            <AreaStack
              data={stackData}
              keys={[...stackKeys]}
              x={(d) => atX(xScale, (d.data as StackPoint).month)}
              y0={(d) => atY(yScale, d[0])}
              y1={(d) => atY(yScale, d[1])}
              color={(key) => colorScale(String(key))}
              curve={curveMonotoneX}
              offset="expand"
            >
              {({ stacks, path }) =>
                stacks.map((stack) => (
                  <path
                    key={`expand-${stack.key}`}
                    d={path(stack) || ''}
                    fill={stackFill(colorScale(String(stack.key)))}
                  />
                ))
              }
            </AreaStack>
            <LinePath
              data={stackData}
              x={(d) => atX(xScale, d.month)}
              y={(d) => atY(yScale, d.desktop / (d.desktop + d.mobile + d.other))}
              curve={curveMonotoneX}
              stroke={seriesColorAlt}
            />
            <LinePath
              data={stackData}
              x={(d) => atX(xScale, d.month)}
              y={(d) => {
                const total = d.desktop + d.mobile + d.other;
                return atY(yScale, (d.desktop + d.mobile) / total);
              }}
              curve={curveMonotoneX}
              stroke={seriesColor}
            />
            <HoverGuide open={tooltipOpen} x={tooltipData?.markX} height={innerHeight} />
            <HoverMarks
              open={tooltipOpen}
              points={
                tooltipData?.markX != null && tooltipData.markYs
                  ? tooltipData.rows.map((row, i) => ({
                      cx: tooltipData.markX ?? 0,
                      cy: tooltipData.markYs?.[i] ?? 0,
                      color: row.color,
                    }))
                  : []
              }
            />
          </>
        )}
      </AreaShell>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={cardTooltipStyle}>
          <CardTooltipBody {...tooltipData} />
        </TooltipWithBounds>
      ) : null}
      <SeriesLegend keys={['desktop', 'mobile', 'other']} />
    </ChartFrame>
  );
};

/** Stacked areas with visible Y axis ticks. */
export const AxesArea: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();
  const colorScale = scaleOrdinal<string, string>({
    domain: [...multiKeys],
    range: [seriesColorAlt, seriesColor],
  });
  const { left } = axesMargin;

  return (
    <ChartFrame>
      <AreaShell
        ariaLabel="Area chart with axes"
        yMax={600}
        leftMargin={left}
        showYAxis
        onLeave={hideTooltip}
        onMove={({ event, xScale, yScale }) => {
          const point = localPoint(event);
          if (!point) {
            return;
          }
          const index = nearestIndex(point.x - left, monthDomain, xScale);
          const d = multiData[index];
          if (!d) {
            return;
          }
          const markX = atX(xScale, d.month);
          const desktopTopY = atY(yScale, d.desktop);
          const mobileTopY = atY(yScale, d.desktop + d.mobile);
          showTooltip({
            tooltipData: {
              title: monthTitles[d.month] ?? d.month,
              rows: [
                { label: 'Mobile', value: d.mobile, color: seriesColor },
                { label: 'Desktop', value: d.desktop, color: seriesColorAlt },
              ],
              markX,
              markYs: [mobileTopY, desktopTopY],
            },
            tooltipLeft: left + markX,
            tooltipTop: margin.top + mobileTopY,
          });
        }}
      >
        {({ xScale, yScale }) => (
          <>
            <AreaStack
              data={multiData}
              keys={[...multiKeys]}
              x={(d) => atX(xScale, (d.data as MultiPoint).month)}
              y0={(d) => atY(yScale, d[0])}
              y1={(d) => atY(yScale, d[1])}
              color={(key) => colorScale(String(key))}
              curve={curveMonotoneX}
            >
              {({ stacks, path }) =>
                stacks.map((stack) => (
                  <path
                    key={`axes-${stack.key}`}
                    d={path(stack) || ''}
                    fill={stackFill(colorScale(String(stack.key)))}
                  />
                ))
              }
            </AreaStack>
            <LinePath
              data={multiData}
              x={(d) => atX(xScale, d.month)}
              y={(d) => atY(yScale, d.desktop)}
              curve={curveMonotoneX}
              stroke={seriesColorAlt}
            />
            <LinePath
              data={multiData}
              x={(d) => atX(xScale, d.month)}
              y={(d) => atY(yScale, d.desktop + d.mobile)}
              curve={curveMonotoneX}
              stroke={seriesColor}
            />
            <HoverMarks
              open={tooltipOpen}
              points={
                tooltipData?.markX != null && tooltipData.markYs
                  ? tooltipData.rows.map((row, i) => ({
                      cx: tooltipData.markX ?? 0,
                      cy: tooltipData.markYs?.[i] ?? 0,
                      color: row.color,
                    }))
                  : []
              }
            />
          </>
        )}
      </AreaShell>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={cardTooltipStyle}>
          <CardTooltipBody {...tooltipData} />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

/** Dense daily dual-series area + width-aware X ticks + card tooltip. */
const DenseAreaPlot: React.FC<{ width: number; height: number }> = ({ width: plotW, height: plotH }) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();
  const plotWidth = Math.max(0, plotW - denseMargin.left - denseMargin.right);
  const plotHeight = Math.max(0, plotH - denseMargin.top - denseMargin.bottom);
  const xScale = scalePoint<string>({
    domain: denseDomain,
    range: [0, plotWidth],
  });
  const yScale = scaleLinear<number>({
    domain: [0, 560],
    range: [plotHeight, 0],
    nice: true,
  });
  const tickValues = thinPointTicks(denseDomain, plotWidth);

  if (plotW < 16 || plotH < 16) {
    return null;
  }

  return (
    <div style={{ position: 'relative', inlineSize: plotW }}>
      <svg
        width={plotW}
        height={plotH}
        role="img"
        aria-label="Dense area chart"
        onMouseLeave={hideTooltip}
        onMouseMove={(event) => {
          const point = localPoint(event);
          if (!point) {
            return;
          }
          const index = nearestIndex(point.x - denseMargin.left, denseDomain, xScale);
          const d = denseData[index];
          if (!d) {
            return;
          }
          const markX = atX(xScale, d.key);
          showTooltip({
            tooltipData: {
              title: d.shortLabel,
              rows: [
                { label: 'Mobile', value: d.mobile, color: seriesColor },
                { label: 'Desktop', value: d.desktop, color: seriesColorAlt },
              ],
              markX,
              markYs: [atY(yScale, d.mobile), atY(yScale, d.desktop)],
            },
            tooltipLeft: denseMargin.left + markX,
            tooltipTop: denseMargin.top + atY(yScale, Math.max(d.mobile, d.desktop)),
          });
        }}
      >
        <Group left={denseMargin.left} top={denseMargin.top}>
          <GridRows scale={yScale} width={plotWidth} numTicks={5} />
          <AreaClosed
            data={denseData}
            x={(d) => atX(xScale, d.key)}
            y={(d) => atY(yScale, d.mobile)}
            yScale={yScale}
            curve={curveMonotoneX}
            stroke={seriesColor}
            strokeWidth={1.5}
          />
          <AreaClosed
            data={denseData}
            x={(d) => atX(xScale, d.key)}
            y={(d) => atY(yScale, d.desktop)}
            yScale={yScale}
            curve={curveMonotoneX}
            stroke={seriesColorAlt}
            strokeWidth={1.5}
          />
          <HoverGuide open={tooltipOpen} x={tooltipData?.markX} height={plotHeight} />
          <HoverMarks
            open={tooltipOpen}
            points={
              tooltipData?.markX != null && tooltipData.markYs
                ? tooltipData.rows.map((row, i) => ({
                    cx: tooltipData.markX ?? 0,
                    cy: tooltipData.markYs?.[i] ?? 0,
                    color: row.color,
                  }))
                : []
            }
          />
          <AxisBottom
            top={plotHeight}
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

export const DenseArea: React.FC = () => (
  <div style={{ boxSizing: 'border-box', width: '100%', height: denseHeight }}>
    <ParentSize debounceTime={0} initialSize={{ width: 720, height: denseHeight }}>
      {({ width: w, height: h }) => <DenseAreaPlot width={w} height={h} />}
    </ParentSize>
  </div>
);
