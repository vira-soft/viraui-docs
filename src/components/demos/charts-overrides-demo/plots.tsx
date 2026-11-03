"use client";

import type * as React from 'react';

import { AxisBottom, AxisLeft, GridRows, Group, LinePath, scaleLinear } from '@viraui/charts';
import { xySeriesShort as data } from '../../../lib/chart-story-data';

const width = 420;
const height = 240;
const margin = { top: 16, right: 16, bottom: 32, left: 40 };
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

export const OverrideComposition: React.FC = () => {
  const xScale = scaleLinear({ domain: [0, Math.max(0, data.length - 1)], range: [0, innerWidth] });
  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.y)) * 1.15],
    range: [innerHeight, 0],
  });

  return (
    <div style={{ inlineSize: width }}>
      <svg width={width} height={height} role="img" aria-label="Override demo chart">
        <Group left={margin.left} top={margin.top}>
          <GridRows scale={yScale} width={innerWidth} />
          <LinePath
            data={data}
            x={(d) => xScale(d.x) ?? 0}
            y={(d) => yScale(d.y) ?? 0}
            stroke="var(--highlight-acid)"
          />
          <AxisBottom top={innerHeight} scale={xScale} tickStroke="var(--highlight-magenta)" />
          <AxisLeft scale={yScale} tickStroke="var(--highlight-magenta)" />
        </Group>
      </svg>
    </div>
  );
};
