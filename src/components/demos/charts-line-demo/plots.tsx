"use client";

import * as React from 'react';

import {
  AxisBottom,
  AxisLeft,
  AxisRight,
  Circle,
  GridColumns,
  GridRows,
  Group,
  Line,
  LinePath,
  Text,
  TooltipWithBounds,
  curveLinear,
  curveMonotoneX,
  curveNatural,
  curveStep,
  defaultStyles,
  localPoint,
  scaleLinear,
  scalePoint,
  useTooltip,
} from '@viraui/charts';
import { mutedLabel, seriesStroke } from '../../../lib/chart-tokens';
import { thinDomainTicks } from '../../../lib/chart-ticks';
import { browserData, desktopData, mobileData, monthDomain, monthTitles, multiData } from '../../../lib/chart-story-data';

type TooltipDatum = {
  title?: string;
  label: string;
  value: number;
  color: string;
  secondary?: {
    label: string;
    value: number;
    color: string;
  };
};

type XScale = ReturnType<typeof scalePoint<string>>;
type YScale = ReturnType<typeof scaleLinear<number>>;

const width = 560;
const height = 320;
/** `left: 48` leaves room for optional `AxisLeft` ticks. */
const margin = { top: 28, right: 24, bottom: 40, left: 48 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const seriesColor = seriesStroke;
const seriesColorAlt = 'var(--highlight-acid)';

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

type LineShellProps = {
  ariaLabel: string;
  children: (args: { xScale: XScale; yScale: YScale }) => React.ReactNode;
  yMax?: number;
  showYAxis?: boolean;
  onMove?: (args: { event: React.MouseEvent<SVGSVGElement>; xScale: XScale; yScale: YScale }) => void;
  onLeave?: () => void;
};

const LineShell: React.FC<LineShellProps> = ({
  ariaLabel,
  children,
  yMax = 360,
  showYAxis = false,
  onMove,
  onLeave,
}) => {
  const xScale = scalePoint<string>({
    domain: monthDomain,
    range: [0, innerWidth],
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
      <Group left={margin.left} top={margin.top}>
        <GridRows scale={yScale} width={innerWidth} numTicks={3} />
        {children({ xScale, yScale })}
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
  );
};

const ChartFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'relative', inlineSize: width }}>{children}</div>
);

/** Active-point mark while tooltip is open (line-only stories). */
const HoverMarks: React.FC<{
  open: boolean;
  points: Array<{ cx: number; cy: number; color: string }>;
}> = ({ open, points }) => {
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

const hoverFromTooltip = (left?: number, top?: number, color?: string) =>
  left == null || top == null || color == null ? [] : [{ cx: left - margin.left, cy: top - margin.top, color }];

const showMonthTooltip = (
  event: React.MouseEvent<SVGSVGElement>,
  xScale: XScale,
  yScale: YScale,
  showTooltip: (args: { tooltipData: TooltipDatum; tooltipLeft: number; tooltipTop: number }) => void,
  options?: { title?: boolean },
) => {
  const point = localPoint(event);
  if (!point) {
    return;
  }
  const index = nearestIndex(point.x - margin.left, monthDomain, xScale);
  const d = desktopData[index];
  if (!d) {
    return;
  }
  showTooltip({
    tooltipData: {
      title: options?.title ? (monthTitles[d.month] ?? d.month) : undefined,
      label: 'Desktop',
      value: d.value,
      color: seriesColor,
    },
    tooltipLeft: margin.left + atX(xScale, d.month),
    tooltipTop: margin.top + atY(yScale, d.value),
  });
};

export const NaturalLine: React.FC<{ showYAxis?: boolean; ariaLabel?: string }> = ({
  showYAxis = false,
  ariaLabel = 'Natural line chart',
}) => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();

  return (
    <ChartFrame>
      <LineShell
        ariaLabel={ariaLabel}
        showYAxis={showYAxis}
        onLeave={hideTooltip}
        onMove={({ event, xScale, yScale }) => showMonthTooltip(event, xScale, yScale, showTooltip)}
      >
        {({ xScale, yScale }) => (
          <>
            <LinePath
              data={desktopData}
              x={(d) => atX(xScale, d.month)}
              y={(d) => atY(yScale, d.value)}
              curve={curveNatural}
            />
            <HoverMarks open={tooltipOpen} points={hoverFromTooltip(tooltipLeft, tooltipTop, tooltipData?.color)} />
          </>
        )}
      </LineShell>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={pillTooltipStyle}>
          <PillTooltipBody {...tooltipData} />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

export const LinearLine: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();

  return (
    <ChartFrame>
      <LineShell
        ariaLabel="Linear line chart"
        onLeave={hideTooltip}
        onMove={({ event, xScale, yScale }) => showMonthTooltip(event, xScale, yScale, showTooltip)}
      >
        {({ xScale, yScale }) => (
          <>
            <LinePath
              data={desktopData}
              x={(d) => atX(xScale, d.month)}
              y={(d) => atY(yScale, d.value)}
              curve={curveLinear}
            />
            <HoverMarks open={tooltipOpen} points={hoverFromTooltip(tooltipLeft, tooltipTop, tooltipData?.color)} />
          </>
        )}
      </LineShell>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={pillTooltipStyle}>
          <PillTooltipBody {...tooltipData} />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

export const StepLine: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();

  return (
    <ChartFrame>
      <LineShell
        ariaLabel="Step line chart"
        onLeave={hideTooltip}
        onMove={({ event, xScale, yScale }) => showMonthTooltip(event, xScale, yScale, showTooltip)}
      >
        {({ xScale, yScale }) => (
          <>
            <LinePath
              data={desktopData}
              x={(d) => atX(xScale, d.month)}
              y={(d) => atY(yScale, d.value)}
              curve={curveStep}
            />
            <HoverMarks open={tooltipOpen} points={hoverFromTooltip(tooltipLeft, tooltipTop, tooltipData?.color)} />
          </>
        )}
      </LineShell>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={pillTooltipStyle}>
          <PillTooltipBody {...tooltipData} />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

export const MultipleLine: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();

  return (
    <ChartFrame>
      <LineShell
        ariaLabel="Multiple series line chart"
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
          showTooltip({
            tooltipData: {
              title: d.month,
              label: 'Desktop',
              value: d.desktop,
              color: seriesColor,
              secondary: { label: 'Mobile', value: d.mobile, color: seriesColorAlt },
            },
            tooltipLeft: margin.left + atX(xScale, d.month),
            tooltipTop: margin.top + atY(yScale, d.desktop),
          });
        }}
      >
        {({ xScale, yScale }) => {
          const cx = tooltipLeft == null ? 0 : tooltipLeft - margin.left;
          const points =
            tooltipOpen && tooltipData
              ? [
                  { cx, cy: tooltipTop == null ? 0 : tooltipTop - margin.top, color: tooltipData.color },
                  ...(tooltipData.secondary
                    ? [
                        {
                          cx,
                          cy: atY(yScale, tooltipData.secondary.value),
                          color: tooltipData.secondary.color,
                        },
                      ]
                    : []),
                ]
              : [];
          return (
            <>
              <LinePath
                data={multiData}
                x={(d) => atX(xScale, d.month)}
                y={(d) => atY(yScale, d.desktop)}
                curve={curveMonotoneX}
              />
              <LinePath
                data={multiData}
                x={(d) => atX(xScale, d.month)}
                y={(d) => atY(yScale, d.mobile)}
                curve={curveMonotoneX}
                stroke={seriesColorAlt}
              />
              <HoverMarks open={tooltipOpen} points={points} />
            </>
          );
        }}
      </LineShell>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={cardTooltipStyle}>
          <CardTooltipBody {...tooltipData} />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

export const DotsLine: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();

  return (
    <ChartFrame>
      <LineShell
        ariaLabel="Line chart with dots"
        onLeave={hideTooltip}
        onMove={({ event, xScale, yScale }) => showMonthTooltip(event, xScale, yScale, showTooltip)}
      >
        {({ xScale, yScale }) => (
          <>
            <LinePath
              data={desktopData}
              x={(d) => atX(xScale, d.month)}
              y={(d) => atY(yScale, d.value)}
              curve={curveMonotoneX}
            />
            {desktopData.map((d) => (
              <Circle
                key={d.month}
                cx={atX(xScale, d.month)}
                cy={atY(yScale, d.value)}
                r={4}
                fill={seriesColor}
                stroke={seriesColor}
              />
            ))}
          </>
        )}
      </LineShell>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={pillTooltipStyle}>
          <PillTooltipBody {...tooltipData} />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

export const MarkersLine: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();

  return (
    <ChartFrame>
      <LineShell
        ariaLabel="Line chart with custom markers"
        onLeave={hideTooltip}
        onMove={({ event, xScale, yScale }) => showMonthTooltip(event, xScale, yScale, showTooltip)}
      >
        {({ xScale, yScale }) => (
          <>
            <LinePath
              data={desktopData}
              x={(d) => atX(xScale, d.month)}
              y={(d) => atY(yScale, d.value)}
              curve={curveMonotoneX}
            />
            {desktopData.map((d) => {
              const x = atX(xScale, d.month);
              const y = atY(yScale, d.value);
              return (
                <Group key={d.month}>
                  <Line from={{ x, y: y - 8 }} to={{ x, y: y + 8 }} stroke={seriesColor} strokeWidth={1.5} />
                  <Circle cx={x} cy={y} r={5} fill="var(--global-background)" stroke={seriesColor} strokeWidth={2} />
                </Group>
              );
            })}
          </>
        )}
      </LineShell>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={pillTooltipStyle}>
          <PillTooltipBody {...tooltipData} />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

export const ValueLabelsLine: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();

  return (
    <ChartFrame>
      <LineShell
        ariaLabel="Line chart with value labels"
        onLeave={hideTooltip}
        onMove={({ event, xScale, yScale }) => showMonthTooltip(event, xScale, yScale, showTooltip, { title: true })}
      >
        {({ xScale, yScale }) => (
          <>
            <LinePath
              data={desktopData}
              x={(d) => atX(xScale, d.month)}
              y={(d) => atY(yScale, d.value)}
              curve={curveMonotoneX}
            />
            {desktopData.map((d) => {
              const x = atX(xScale, d.month);
              const y = atY(yScale, d.value);
              return (
                <Group key={d.month}>
                  <Circle cx={x} cy={y} r={4} fill={seriesColor} stroke={seriesColor} />
                  <Text x={x} y={y - 12} textAnchor="middle" verticalAnchor="end">
                    {d.value}
                  </Text>
                </Group>
              );
            })}
          </>
        )}
      </LineShell>
      {tooltipOpen && tooltipData ? (
        <TooltipWithBounds top={tooltipTop} left={tooltipLeft} style={cardTooltipStyle}>
          <CardTooltipBody {...tooltipData} />
        </TooltipWithBounds>
      ) : null}
    </ChartFrame>
  );
};

export const CategoryLabelsLine: React.FC = () => {
  const { tooltipData, tooltipLeft, tooltipTop, tooltipOpen, showTooltip, hideTooltip } = useTooltip<TooltipDatum>();
  const names = browserData.map((d) => d.name);
  const xScale = scalePoint<string>({ domain: names, range: [0, innerWidth] });
  const yScale = scaleLinear<number>({ domain: [0, 320], range: [innerHeight, 0], nice: true });

  return (
    <ChartFrame>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label="Line chart with category labels"
        onMouseLeave={hideTooltip}
        onMouseMove={(event) => {
          const point = localPoint(event);
          if (!point) {
            return;
          }
          const index = nearestIndex(point.x - margin.left, names, xScale);
          const d = browserData[index];
          if (!d) {
            return;
          }
          showTooltip({
            tooltipData: { label: d.name, value: d.value, color: seriesColor },
            tooltipLeft: margin.left + atX(xScale, d.name),
            tooltipTop: margin.top + atY(yScale, d.value),
          });
        }}
      >
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={yScale} width={innerWidth} numTicks={3} />
          <LinePath
            data={browserData}
            x={(d) => atX(xScale, d.name)}
            y={(d) => atY(yScale, d.value)}
            curve={curveMonotoneX}
          />
          {browserData.map((d) => {
            const x = atX(xScale, d.name);
            const y = atY(yScale, d.value);
            return (
              <Group key={d.name}>
                <Circle cx={x} cy={y} r={4} fill={seriesColor} stroke={seriesColor} />
                <Text x={x} y={y - 12} textAnchor="middle" verticalAnchor="end">
                  {d.name}
                </Text>
              </Group>
            );
          })}
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

const mobileSeriesColor = 'var(--highlight-red)';
const mobileFrameWidth = 390;
const mobilePlotHeight = 240;
const mobileYAxisWidth = 36;
const mobileDaySlotPx = 32;
const mobileMargin = { top: 12, right: 8, bottom: 36, left: 12 };
const mobileYDomain: [number, number] = [55, 105];

const mobileDomain = mobileData.map((d) => d.key);
const mobileByKey = new Map(mobileData.map((d) => [d.key, d]));
const mobileAverage = Math.round(mobileData.reduce((sum, d) => sum + d.bpm, 0) / mobileData.length);
const mobileTickKeys = mobileDomain.filter((_, i) => {
  const day = mobileData[i]?.day;
  return day === 7 || day === 14 || day === 21 || day === 28;
});

/** iOS Health–style: sticky Y, scroll X, header reads selection (no floating tooltip). */
export const MobileScrubLine: React.FC = () => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const pointerStartRef = React.useRef<{ x: number; y: number } | null>(null);
  const [selectedKey, setSelectedKey] = React.useState<string | null>(null);

  const innerHeight = mobilePlotHeight - mobileMargin.top - mobileMargin.bottom;
  const plotWidth = Math.max(mobileDomain.length * mobileDaySlotPx, mobileFrameWidth - mobileYAxisWidth);
  const innerWidth = Math.max(0, plotWidth - mobileMargin.left - mobileMargin.right);

  const xScale = scalePoint<string>({
    domain: mobileDomain,
    range: [0, innerWidth],
  });
  const yScale = scaleLinear<number>({
    domain: mobileYDomain,
    range: [innerHeight, 0],
    nice: true,
  });

  React.useEffect(() => {
    const node = scrollRef.current;
    if (node) {
      node.scrollLeft = node.scrollWidth;
    }
  }, []);

  const selected = selectedKey == null ? null : (mobileByKey.get(selectedKey) ?? null);
  const headerValue = selected?.bpm ?? mobileAverage;
  const headerEyebrow = selected ? 'RESTING HEART RATE' : 'AVERAGE';
  const headerDate = selected?.dateLabel ?? 'Last 30 sessions';

  const selectNearest = (event: React.PointerEvent<SVGSVGElement>) => {
    const point = localPoint(event);
    if (!point) {
      return;
    }
    const index = nearestIndex(point.x - mobileMargin.left, mobileDomain, xScale);
    const d = mobileData[index];
    if (d) {
      setSelectedKey(d.key);
    }
  };

  return (
    <div
      style={{
        boxSizing: 'border-box',
        inlineSize: '100%',
        maxInlineSize: mobileFrameWidth,
        marginInline: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-m)',
        padding: 'var(--space-m)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xs)' }}>
        <div
          style={{
            color: mutedLabel,
            fontSize: 'var(--font-scale-body-xs)',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {headerEyebrow}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-xs)' }}>
          <span
            style={{
              color: 'var(--global-foreground)',
              fontSize: 'var(--font-scale-h1)',
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {headerValue}
          </span>
          <span style={{ color: mutedLabel, fontSize: 'var(--font-scale-body-m)' }}>BPM</span>
        </div>
        <div style={{ color: mutedLabel, fontSize: 'var(--font-scale-body-s)' }}>{headerDate}</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'stretch', minInlineSize: 0 }}>
        <div
          ref={scrollRef}
          role="region"
          tabIndex={0}
          aria-label="Resting heart rate chart, scroll horizontally"
          style={{
            flex: 1,
            minInlineSize: 0,
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x',
          }}
        >
          <svg
            width={plotWidth}
            height={mobilePlotHeight}
            role="img"
            aria-label="Resting heart rate, scrub to select a day"
            style={{ display: 'block', touchAction: 'pan-x' }}
            onPointerDown={(event) => {
              pointerStartRef.current = { x: event.clientX, y: event.clientY };
              if (event.pointerType === 'mouse') {
                selectNearest(event);
              }
            }}
            onPointerMove={(event) => {
              // Mouse: live scrub. Touch: leave pan-x to the scrollport (tap selects on up).
              if (event.pointerType === 'mouse') {
                selectNearest(event);
              }
            }}
            onPointerUp={(event) => {
              const start = pointerStartRef.current;
              pointerStartRef.current = null;
              if (event.pointerType === 'mouse' || start == null) {
                return;
              }
              const dx = Math.abs(event.clientX - start.x);
              const dy = Math.abs(event.clientY - start.y);
              if (dx < 8 && dy < 8) {
                selectNearest(event);
              }
            }}
            onPointerLeave={(event) => {
              pointerStartRef.current = null;
              // Touch lift often fires leave after tap — keep sticky selection on touch.
              if (event.pointerType === 'mouse') {
                setSelectedKey(null);
              }
            }}
          >
            {/* SVG default pointer-events is visiblePainted — empty plot space never fires hover. */}
            <rect width={plotWidth} height={mobilePlotHeight} fill="transparent" />
            <Group left={mobileMargin.left} top={mobileMargin.top}>
              <GridRows scale={yScale} width={innerWidth} tickValues={[60, 80, 100]} />
              <GridColumns scale={xScale} height={innerHeight} tickValues={mobileTickKeys} strokeDasharray="3 5" />
              <LinePath
                data={mobileData}
                x={(d) => atX(xScale, d.key)}
                y={(d) => atY(yScale, d.bpm)}
                curve={curveMonotoneX}
                stroke={mobileSeriesColor}
                strokeWidth={2}
                style={{ pointerEvents: 'none' }}
              />
              {mobileData.map((d) => {
                const active = selectedKey === d.key;
                return (
                  <Circle
                    key={d.key}
                    cx={atX(xScale, d.key)}
                    cy={atY(yScale, d.bpm)}
                    r={active ? 6 : 3.5}
                    fill="var(--global-background)"
                    stroke={mobileSeriesColor}
                    strokeWidth={active ? 2.5 : 1.5}
                    style={{ pointerEvents: 'none' }}
                  />
                );
              })}
              {selected ? (
                <Line
                  from={{ x: atX(xScale, selected.key), y: 0 }}
                  to={{ x: atX(xScale, selected.key), y: innerHeight }}
                  stroke="var(--global-foreground)"
                  strokeWidth={1}
                  style={{ pointerEvents: 'none' }}
                />
              ) : null}
              <AxisBottom
                top={innerHeight}
                scale={xScale}
                tickValues={mobileTickKeys}
                tickFormat={(value) => String(mobileByKey.get(String(value))?.day ?? value)}
                hideAxisLine
                hideTicks
              />
            </Group>
          </svg>
        </div>
        <div
          style={{
            flexShrink: 0,
            inlineSize: mobileYAxisWidth,
            background: 'var(--global-background)',
          }}
        >
          <svg width={mobileYAxisWidth} height={mobilePlotHeight} aria-hidden>
            <Group top={mobileMargin.top}>
              <AxisRight scale={yScale} tickValues={[60, 80, 100]} hideAxisLine hideTicks />
            </Group>
          </svg>
        </div>
      </div>
    </div>
  );
};
