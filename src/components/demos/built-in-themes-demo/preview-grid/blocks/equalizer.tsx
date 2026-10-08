"use client";

import * as React from "react";
import { Slider, Stack, Surface, Switch, Text, Title } from "@viraui/react";

const equalizerBands = [
  { id: "60", label: "60" },
  { id: "150", label: "150" },
  { id: "400", label: "400" },
  { id: "1k", label: "1K" },
  { id: "2.4k", label: "2.4K" },
  { id: "6k", label: "6K" },
  { id: "12k", label: "12K" },
] as const;

const flatLevels = [50, 50, 50, 50, 50, 50, 50] as const;

const readSliderValue = (value: number | readonly number[]) =>
  Array.isArray(value) ? (value[0] ?? 0) : value;

const clampPercentage = (value: number) => Math.min(100, Math.max(0, value));

// ponytail: fixed gaussian σ=1.25 (~3-band pull). Upgrade to measured Q-factor if band count grows.
const WAVE_SIGMA = 1.25;
const WAVE_SIGMA_SQ = 2 * WAVE_SIGMA * WAVE_SIGMA;
const WAVE_CUTOFF = 0.02;

const equalizerFalloff = (distance: number) => {
  if (distance === 0) {
    return 1;
  }
  return Math.exp(-(distance * distance) / WAVE_SIGMA_SQ);
};

/** Apply linked EQ wave from a frozen gesture anchor (not from live waved levels). */
const applyEqualizerWave = (
  anchor: readonly number[],
  activeIndex: number,
  nextActiveValue: number,
): number[] => {
  const origin = anchor[activeIndex] ?? nextActiveValue;
  const delta = nextActiveValue - origin;

  return anchor.map((level, bandIndex) => {
    const weight = equalizerFalloff(Math.abs(bandIndex - activeIndex));
    if (weight < WAVE_CUTOFF) {
      return level;
    }
    return clampPercentage(Math.round(level + delta * weight));
  });
};

type EqualizerBlockProps = React.ComponentPropsWithoutRef<typeof Surface>;

/** Design Kitchen Studio EQ — shorter band track for docs preview. */
export const EqualizerBlock: React.FC<EqualizerBlockProps> = ({
  ...otherProps
}) => {
  const [enabled, setEnabled] = React.useState(true);
  const [levels, setLevels] = React.useState<number[]>([...flatLevels]);

  const levelsRef = React.useRef(levels);
  const anchorRef = React.useRef<number[] | null>(null);
  const activeBandRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    levelsRef.current = levels;
  }, [levels]);

  const endGesture = () => {
    activeBandRef.current = null;
    anchorRef.current = null;
  };

  const onBandChange = (index: number, value: number) => {
    if (activeBandRef.current !== null && activeBandRef.current !== index) {
      return;
    }

    if (activeBandRef.current !== index) {
      activeBandRef.current = index;
      anchorRef.current = levelsRef.current.slice();
    }

    const anchor = anchorRef.current ?? levelsRef.current;
    const next = applyEqualizerWave(anchor, index, value);
    levelsRef.current = next;
    setLevels(next);
  };

  return (
    <Surface
      border="all"
      color={1}
      hPadding="m"
      radius="l"
      vPadding="m"
      {...otherProps}
    >
      <Stack rowGap="m">
        <Stack
          columnGap="m"
          direction="row"
          hAlign="space-between"
          vAlign="start"
        >
          <Title render={<h2 />} size="6">
            Studio EQ
          </Title>
          <Switch
            aria-label="Enable equalizer"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </Stack>

        <Surface color={2} hPadding="m" radius="m" vPadding="m">
          <Stack
            columnGap="xs"
            direction="row"
            hAlign="space-between"
            vAlign="end"
          >
            {equalizerBands.map((band, index) => (
              <div
                key={band.id}
                data-eq-band=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  rowGap: "var(--space-s)",
                  // ponytail: docs mini — kitchen uses 11rem; taller after dropping subtitle.
                  blockSize: "7rem",
                  minInlineSize: "3ch",
                }}
              >
                <div
                  style={{
                    flex: "1 1 auto",
                    minBlockSize: 0,
                    display: "flex",
                  }}
                >
                  <Slider
                    aria-label={`${band.label} hertz band`}
                    disabled={!enabled}
                    max={100}
                    min={0}
                    onValueChange={(value) =>
                      onBandChange(index, readSliderValue(value))
                    }
                    onValueCommitted={endGesture}
                    orientation="vertical"
                    renderValue
                    thumbAriaLabel={`${band.label} hertz band`}
                    value={levels[index]}
                  />
                </div>
                <Text align="center" family="mono" size="xs" tone="muted">
                  {band.label}
                </Text>
              </div>
            ))}
          </Stack>
        </Surface>
      </Stack>
    </Surface>
  );
};
