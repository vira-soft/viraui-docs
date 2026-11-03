"use client";

import * as React from 'react';

import {
  AreaClosed,
  AxisBottom,
  BarRounded,
  Circle,
  GridRows,
  Group,
  Line,
  LinePath,
  LineRadial,
  ParentSize,
  Pie,
  Point,
  ScaleSVG,
  curveMonotoneX,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  scalePoint,
  useParentSize,
  useScreenSize,
} from '@viraui/charts';
import { contrastStroke, seriesStroke } from '../../../lib/chart-tokens';
import { thinDomainTicks } from '../../../lib/chart-ticks';
import { browserData, desktopData, monthDeviceData, xySeries as lineData } from '../../../lib/chart-story-data';

const margin = { top: 16, right: 16, bottom: 32, left: 16 };
const pieColors = [
  'var(--highlight-cyan)',
  'var(--highlight-blue)',
  'var(--highlight-indigo)',
  'var(--highlight-purple)',
  'var(--highlight-slate)',
];

/**
 * Fluid host — needs Storybook `layout: 'fullscreen'` so preview skips
 * `place-content: center` (that grid shrink-wraps `%` width to content / 0).
 * No padding on the measured node — SVG uses the observed box 1:1.
 */
const hostStyle: React.CSSProperties = {
  boxSizing: 'border-box',
  width: '100%',
  height: 280,
};

const asNumber = (value: unknown): number => (value == null ? 0 : Number(value));

const monthDomain = desktopData.map((d) => d.month);
const yMax = Math.max(...desktopData.map((d) => d.value)) * 1.15;
const radarMax = Math.max(...monthDeviceData.map((d) => d.desktop));

const SizeBadge: React.FC<{ width: number; height: number }> = ({ width, height }) => (
  <div
    style={{
      position: 'absolute',
      top: 8,
      right: 8,
      font: '12px/1.2 var(--font-mono, ui-monospace, monospace)',
      opacity: 0.7,
      pointerEvents: 'none',
      zIndex: 1,
    }}
  >
    {Math.round(width)}×{Math.round(height)}
  </div>
);

type PlotSize = { width: number; height: number };

const LineChartMarks: React.FC<PlotSize> = ({ width, height }) => {
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);
  const xScale = scaleLinear({ domain: [0, Math.max(0, lineData.length - 1)], range: [0, innerWidth] });
  const yScale = scaleLinear({
    domain: [0, Math.max(...lineData.map((d) => d.y)) * 1.15],
    range: [innerHeight, 0],
  });

  return (
    <Group left={margin.left} top={margin.top}>
      <GridRows scale={yScale} width={innerWidth} numTicks={3} />
      <LinePath data={lineData} x={(d) => asNumber(xScale(d.x))} y={(d) => asNumber(yScale(d.y))} />
      <AxisBottom top={innerHeight} scale={xScale} numTicks={3} hideAxisLine hideTicks />
    </Group>
  );
};

const BarChartMarks: React.FC<PlotSize> = ({ width, height }) => {
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);
  const xScale = scaleBand<string>({ domain: monthDomain, range: [0, innerWidth], padding: 0.3 });
  const yScale = scaleLinear({ domain: [0, yMax], range: [innerHeight, 0], nice: true });
  const bandwidth = xScale.bandwidth();

  return (
    <Group left={margin.left} top={margin.top}>
      <GridRows scale={yScale} width={innerWidth} numTicks={3} />
      {desktopData.map((d) => {
        const barY = asNumber(yScale(d.value));
        return (
          <BarRounded
            key={d.month}
            x={asNumber(xScale(d.month))}
            y={barY}
            width={bandwidth}
            height={Math.max(0, innerHeight - barY)}
            all={false}
            top
            fill={seriesStroke}
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
    </Group>
  );
};

const AreaChartMarks: React.FC<PlotSize> = ({ width, height }) => {
  const innerWidth = Math.max(0, width - margin.left - margin.right);
  const innerHeight = Math.max(0, height - margin.top - margin.bottom);
  const xScale = scalePoint<string>({ domain: monthDomain, range: [0, innerWidth] });
  const yScale = scaleLinear({ domain: [0, yMax], range: [innerHeight, 0], nice: true });

  return (
    <Group left={margin.left} top={margin.top}>
      <GridRows scale={yScale} width={innerWidth} numTicks={3} />
      <AreaClosed
        data={desktopData}
        x={(d) => asNumber(xScale(d.month))}
        y={(d) => asNumber(yScale(d.value))}
        yScale={yScale}
        curve={curveMonotoneX}
      />
      <AxisBottom
        top={innerHeight}
        scale={xScale}
        tickValues={thinDomainTicks(monthDomain, innerWidth)}
        hideAxisLine
        hideTicks
      />
    </Group>
  );
};

const PieChartMarks: React.FC<PlotSize> = ({ width, height }) => {
  const size = Math.min(width, height);
  const radius = Math.max(0, size / 2 - 12);
  const colorScale = scaleOrdinal({
    domain: browserData.map((d) => d.name),
    range: pieColors,
  });

  return (
    <Group top={height / 2} left={width / 2}>
      <Pie
        data={browserData}
        pieValue={(d) => d.value}
        pieSort={null}
        pieSortValues={null}
        outerRadius={radius}
        padAngle={0.02}
      >
        {({ arcs, path }) =>
          arcs.map((arc) => (
            <path
              key={arc.data.name}
              d={path(arc) ?? undefined}
              fill={colorScale(arc.data.name)}
              stroke="var(--global-background)"
              strokeWidth={2}
            />
          ))
        }
      </Pie>
    </Group>
  );
};

const radarDegrees = 360;
const genAngles = (length: number) =>
  Array.from({ length: length + 1 }, (_, i) => ({
    angle: i * (radarDegrees / length) + (length % 2 === 0 ? 0 : radarDegrees / length / 2),
  }));
const genAxisPoints = (length: number, radius: number) => {
  const step = (Math.PI * 2) / length;
  return Array.from({ length }, (_, i) => ({
    x: radius * Math.sin(i * step),
    y: radius * Math.cos(i * step),
  }));
};

const RadarChartMarks: React.FC<PlotSize> = ({ width, height }) => {
  const pad = 36;
  const radius = Math.max(0, Math.min(width, height) / 2 - pad);
  const count = monthDeviceData.length;
  const radialScale = scaleLinear<number>({ range: [0, Math.PI * 2], domain: [radarDegrees, 0] });
  const valueScale = scaleLinear<number>({ range: [0, radius], domain: [0, radarMax] });
  const webs = genAngles(count);
  const axisPoints = genAxisPoints(count, radius);
  const zero = new Point({ x: 0, y: 0 });
  const points = monthDeviceData.map((d, i) => {
    const step = (Math.PI * 2) / count;
    const r = asNumber(valueScale(d.desktop));
    return { x: r * Math.sin(i * step), y: r * Math.cos(i * step) };
  });
  const pointString = `${points.map((p) => `${p.x},${p.y}`).join(' ')} ${points[0] ? `${points[0].x},${points[0].y}` : ''}`;

  return (
    <Group top={height / 2} left={width / 2}>
      {Array.from({ length: 4 }, (_, level) => {
        const ringRadius = ((level + 1) * radius) / 4;
        return (
          <LineRadial
            key={`web-${ringRadius}`}
            data={webs}
            angle={(d) => asNumber(radialScale(d.angle))}
            radius={ringRadius}
            fill="none"
            stroke={contrastStroke}
            strokeWidth={1}
          />
        );
      })}
      {axisPoints.map((point, i) => (
        <Line
          key={`spoke-${monthDeviceData[i]?.month ?? i}`}
          from={zero}
          to={new Point({ x: point.x, y: point.y })}
          stroke={contrastStroke}
          strokeWidth={1}
        />
      ))}
      <polygon
        points={pointString}
        fill="oklab(from var(--highlight-cyan) l a b / 28%)"
        stroke="var(--highlight-cyan)"
        strokeWidth={2}
      />
      {points.map((point, i) => (
        <Circle key={monthDeviceData[i]?.month ?? i} cx={point.x} cy={point.y} r={3} fill="var(--highlight-cyan)" />
      ))}
    </Group>
  );
};

const ChartSvg: React.FC<PlotSize & { label: string; children: React.ReactNode }> = ({
  width,
  height,
  label,
  children,
}) => {
  if (width < 16 || height < 16) {
    return null;
  }

  return (
    <svg width={width} height={height} role="img" aria-label={label}>
      {children}
    </svg>
  );
};

const plotLine = (size: PlotSize) => <LineChartMarks width={size.width} height={size.height} />;
export const plotBar = (size: PlotSize) => <BarChartMarks width={size.width} height={size.height} />;
export const plotArea = (size: PlotSize) => <AreaChartMarks width={size.width} height={size.height} />;
export const plotPie = (size: PlotSize) => <PieChartMarks width={size.width} height={size.height} />;
export const plotRadar = (size: PlotSize) => <RadarChartMarks width={size.width} height={size.height} />;

export const FluidChart: React.FC<{
  label: string;
  height?: number;
  plot: (size: PlotSize) => React.ReactNode;
}> = ({ label, height = 280, plot }) => (
  <div style={{ ...hostStyle, height, position: 'relative' }}>
    <ParentSize debounceTime={0} initialSize={{ width: 640, height }}>
      {({ width, height: h }) => (
        <>
          <SizeBadge width={width} height={h} />
          <ChartSvg width={width} height={h} label={label}>
            {plot({ width, height: h })}
          </ChartSvg>
        </>
      )}
    </ParentSize>
  </div>
);

export const UseParentSizeDemo: React.FC = () => {
  const { parentRef, width, height } = useParentSize({
    debounceTime: 0,
    initialSize: { width: 640, height: 280 },
  });

  return (
    <div ref={parentRef} style={{ ...hostStyle, position: 'relative' }}>
      <SizeBadge width={width} height={height} />
      <ChartSvg width={width} height={height} label="useParentSize line chart">
        <LineChartMarks width={width} height={height} />
      </ChartSvg>
    </div>
  );
};

export const ParentSizeDemo: React.FC = () => <FluidChart label="ParentSize line chart" plot={plotLine} />;

export const UseScreenSizeDemo: React.FC = () => {
  const { width: screenWidth, height: screenHeight } = useScreenSize({ debounceTime: 0 });
  const width = Math.max(0, (screenWidth || 640) - 48);
  const height = Math.min(Math.max((screenHeight || 720) * 0.4, 200), 420);

  return (
    <div style={{ ...hostStyle, height, position: 'relative' }}>
      <SizeBadge width={width} height={height} />
      <ChartSvg width={width} height={height} label="useScreenSize line chart">
        <LineChartMarks width={width} height={height} />
      </ChartSvg>
    </div>
  );
};

export const ScaleSvgDemo: React.FC = () => (
  <div style={{ ...hostStyle, height: 'auto', position: 'relative' }} role="img" aria-label="ScaleSVG line chart">
    {/* ScaleSVG owns the outer <svg viewBox> — children must not nest another <svg>. */}
    <ScaleSVG width={400} height={240}>
      <LineChartMarks width={400} height={240} />
    </ScaleSVG>
  </div>
);
