"use client";

import type * as React from 'react';

import {
  AxisBottom,
  AxisLeft,
  BarRounded,
  GridRows,
  Group,
  LinePath,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
} from '@viraui/charts';
import { browserData, desktopData, monthDomain, xySeriesShort as data } from '../../../lib/chart-story-data';

const width = 420;
const height = 240;
const margin = { top: 16, right: 16, bottom: 32, left: 40 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const ChartFrame: React.FC<{ children: React.ReactNode; label: string }> = ({ children, label }) => (
  <div style={{ inlineSize: width }}>
    <svg width={width} height={height} role="img" aria-label={label}>
      {children}
    </svg>
  </div>
);

/** Acid series stroke + magenta axis tick strokes. */
export const OverrideComposition: React.FC = () => {
  const xScale = scaleLinear({ domain: [0, Math.max(0, data.length - 1)], range: [0, innerWidth] });
  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.y)) * 1.15],
    range: [innerHeight, 0],
  });

  return (
    <ChartFrame label="Series and chrome token overrides">
      <Group left={margin.left} top={margin.top}>
        <GridRows scale={yScale} width={innerWidth} numTicks={3} />
        <LinePath
          data={data}
          x={(d) => xScale(d.x) ?? 0}
          y={(d) => yScale(d.y) ?? 0}
          stroke="var(--highlight-acid)"
        />
        <AxisBottom top={innerHeight} scale={xScale} numTicks={3} tickStroke="var(--highlight-magenta)" />
        <AxisLeft scale={yScale} numTicks={3} tickStroke="var(--highlight-magenta)" />
      </Group>
    </ChartFrame>
  );
};

/** Same-hue highlight ramp for category bars (cool family). */
export const OverrideHueScale: React.FC = () => {
  const colorScale = scaleOrdinal({
    domain: browserData.map((d) => d.name),
    range: [
      'var(--highlight-cyan)',
      'var(--highlight-blue)',
      'var(--highlight-indigo)',
      'var(--highlight-purple)',
      'var(--highlight-slate)',
    ],
  });
  const xScale = scaleBand({
    domain: browserData.map((d) => d.name),
    range: [0, innerWidth],
    padding: 0.28,
  });
  const yScale = scaleLinear({
    domain: [0, Math.max(...browserData.map((d) => d.value)) * 1.1],
    range: [innerHeight, 0],
    nice: true,
  });
  const bandwidth = xScale.bandwidth();

  return (
    <ChartFrame label="Same-hue highlight bar scale">
      <Group left={margin.left} top={margin.top}>
        <GridRows scale={yScale} width={innerWidth} numTicks={3} />
        {browserData.map((d) => {
          const barY = yScale(d.value) ?? 0;
          return (
            <BarRounded
              key={d.name}
              x={xScale(d.name) ?? 0}
              y={barY}
              width={bandwidth}
              height={Math.max(0, innerHeight - barY)}
              fill={colorScale(d.name)}
            />
          );
        })}
        <AxisBottom top={innerHeight} scale={xScale} hideAxisLine hideTicks />
      </Group>
    </ChartFrame>
  );
};

/**
 * Neutral ink ramp: mid `--base-*` into `--global-foreground`.
 * (Light `--base-1`…`--base-3` are surface washes — near-invisible as bar fills on light canvas.)
 */
export const OverrideBaseRamp: React.FC = () => {
  const categories = browserData.slice(0, 4);
  const colorScale = scaleOrdinal({
    domain: categories.map((d) => d.name),
    range: ['var(--base-4)', 'var(--base-5)', 'var(--base-6)', 'var(--global-foreground)'],
  });
  const xScale = scaleBand({
    domain: categories.map((d) => d.name),
    range: [0, innerWidth],
    padding: 0.28,
  });
  const yScale = scaleLinear({
    domain: [0, Math.max(...categories.map((d) => d.value)) * 1.1],
    range: [innerHeight, 0],
    nice: true,
  });
  const bandwidth = xScale.bandwidth();

  return (
    <ChartFrame label="Neutral base ramp bar fills">
      <Group left={margin.left} top={margin.top}>
        <GridRows scale={yScale} width={innerWidth} numTicks={3} />
        {categories.map((d) => {
          const barY = yScale(d.value) ?? 0;
          return (
            <BarRounded
              key={d.name}
              x={xScale(d.name) ?? 0}
              y={barY}
              width={bandwidth}
              height={Math.max(0, innerHeight - barY)}
              fill={colorScale(d.name)}
            />
          );
        })}
        <AxisBottom top={innerHeight} scale={xScale} hideAxisLine hideTicks />
      </Group>
    </ChartFrame>
  );
};

/** One highlight, ranked by oklab alpha — same tone, rising weight. */
export const OverrideOpacityRamp: React.FC = () => {
  const fills = [
    'oklab(from var(--highlight-blue) l a b / 24%)',
    'oklab(from var(--highlight-blue) l a b / 38%)',
    'oklab(from var(--highlight-blue) l a b / 52%)',
    'oklab(from var(--highlight-blue) l a b / 66%)',
    'oklab(from var(--highlight-blue) l a b / 82%)',
    'var(--highlight-blue)',
  ];
  const xScale = scaleBand({
    domain: monthDomain,
    range: [0, innerWidth],
    padding: 0.3,
  });
  const yScale = scaleLinear({
    domain: [0, Math.max(...desktopData.map((d) => d.value)) * 1.1],
    range: [innerHeight, 0],
    nice: true,
  });
  const bandwidth = xScale.bandwidth();

  return (
    <ChartFrame label="Single-hue opacity bar ramp">
      <Group left={margin.left} top={margin.top}>
        <GridRows scale={yScale} width={innerWidth} numTicks={3} />
        {desktopData.map((d, i) => {
          const barY = yScale(d.value) ?? 0;
          return (
            <BarRounded
              key={d.month}
              x={xScale(d.month) ?? 0}
              y={barY}
              width={bandwidth}
              height={Math.max(0, innerHeight - barY)}
              fill={fills[i] ?? 'var(--highlight-blue)'}
            />
          );
        })}
        <AxisBottom top={innerHeight} scale={xScale} hideAxisLine hideTicks numTicks={3} />
      </Group>
    </ChartFrame>
  );
};
