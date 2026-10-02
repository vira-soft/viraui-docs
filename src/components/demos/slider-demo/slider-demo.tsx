"use client";

import * as React from "react";
import { Sun } from "@phosphor-icons/react";
import { Button, Slider, Stack, Surface, Text } from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 280,
}) => (
  <ViraSandbox
    dialogShell={false}
    height={height}
    label={label}
    vAlign="center"
  >
    {children}
  </ViraSandbox>
);

type FieldShellProps = {
  children: React.ReactNode;
  /** Caps shell width. @defaultValue '24rem' */
  maxInlineSize?: string;
};

const FieldShell: React.FC<FieldShellProps> = ({
  children,
  maxInlineSize = "24rem",
}) => (
  <Stack
    expandChildren
    fullWidth
    style={{
      inlineSize: "100%",
      maxInlineSize,
      marginInline: "auto",
    }}
  >
    {children}
  </Stack>
);

/** Labeled single-thumb amount with live value and min/max captions. */
export const SliderAmountDemo: React.FC = () => (
  <SandboxShell label="Payout amount Slider with captions">
    <FieldShell>
      <Stack rowGap="m">
        <Slider
          defaultValue={2500}
          label="Minimum payout"
          max={10000}
          min={50}
          renderValue
          step={50}
        />
        <Stack
          columnGap="s"
          direction="row"
          hAlign="space-between"
          vAlign="center"
        >
          <Text family="mono" size="xs" tone="muted">
            $50
          </Text>
          <Text family="mono" size="xs" tone="muted">
            $10,000
          </Text>
        </Stack>
      </Stack>
    </FieldShell>
  </SandboxShell>
);

/** Dual-thumb price range with custom value formatting. */
export const SliderRangeDemo: React.FC = () => (
  <SandboxShell label="Price range Slider with two thumbs">
    <FieldShell>
      <Slider
        defaultValue={[120, 480]}
        description="Filter listings by nightly rate."
        label="Price range"
        max={800}
        min={0}
        renderValue={(formattedValues) =>
          `$${formattedValues[0]} – $${formattedValues[1]}`
        }
        step={10}
        thumbAriaLabel={["Minimum price", "Maximum price"]}
      />
    </FieldShell>
  </SandboxShell>
);

/** Controlled saturation Slider driving a photo preview. */
export const SliderSaturationDemo: React.FC = () => {
  const [saturation, setSaturation] = React.useState(100);

  return (
    <SandboxShell height={360} label="Saturation Slider controlling a photo">
      <FieldShell maxInlineSize="20rem">
        <Stack rowGap="l">
          <Surface
            border="all"
            overflow="hidden"
            radius="m"
            style={{ aspectRatio: "4 / 3" }}
          >
            <img
              alt="Studio portrait"
              src="https://mockmind-api.uifaces.co/content/human/80.jpg"
              style={{
                blockSize: "100%",
                filter: `saturate(${saturation}%)`,
                inlineSize: "100%",
                objectFit: "cover",
              }}
            />
          </Surface>
          <Slider
            label="Saturation"
            max={200}
            min={0}
            renderValue={(formattedValues) => `${formattedValues[0]}%`}
            step={1}
            value={saturation}
            onValueChange={(next) => {
              setSaturation(next as number);
            }}
          />
        </Stack>
      </FieldShell>
    </SandboxShell>
  );
};

/** External label row — icon + name beside the track. */
export const SliderBrightnessDemo: React.FC = () => {
  const [brightness, setBrightness] = React.useState(86);

  return (
    <SandboxShell height={220} label="Brightness Slider with external label">
      <FieldShell maxInlineSize="28rem">
        <Surface color={2} hPadding="m" radius="l" vPadding="m">
          <Stack
            columnGap="m"
            direction="row"
            expandChildren
            vAlign="center"
          >
            <Stack
              columnGap="s"
              data-grow="false"
              direction="row"
              minWidth="13ch"
              vAlign="center"
            >
              <Sun aria-hidden size={16} />
              <Text weight="semibold" whiteSpace="nowrap">
                Brightness
              </Text>
            </Stack>
            <Slider
              aria-label="Kitchen island brightness"
              max={100}
              min={0}
              thumbAriaLabel="Kitchen island brightness"
              value={brightness}
              onValueChange={(next) => {
                setBrightness(next as number);
              }}
            />
            <Text
              align="end"
              data-shrink="false"
              family="mono"
              size="xs"
              style={{ minInlineSize: "4ch" }}
              tone="muted"
            >
              {brightness}%
            </Text>
          </Stack>
        </Surface>
      </FieldShell>
    </SandboxShell>
  );
};

const equalizerBands = [
  { id: "60", label: "60" },
  { id: "150", label: "150" },
  { id: "400", label: "400" },
  { id: "1k", label: "1K" },
  { id: "2.4k", label: "2.4K" },
  { id: "6k", label: "6K" },
  { id: "12k", label: "12K" },
] as const;

const equalizerPresets = {
  flat: [50, 50, 50, 50, 50, 50, 50],
  bass: [78, 68, 55, 50, 48, 46, 44],
  vocal: [45, 50, 62, 75, 70, 55, 48],
  bright: [42, 45, 50, 55, 65, 80, 88],
} as const;

const readSliderValue = (value: number | readonly number[]) =>
  Array.isArray(value) ? (value[0] ?? 0) : value;

const clampPercentage = (value: number) => Math.min(100, Math.max(0, value));

// ponytail: fixed gaussian σ=1.25 (~3-band pull). Upgrade to measured Q-factor if band count grows.
const WAVE_SIGMA = 1.25;
const WAVE_SIGMA_SQ = 2 * WAVE_SIGMA * WAVE_SIGMA;
const WAVE_CUTOFF = 0.02;

const equalizerFalloff = (distance: number) => {
  if (distance === 0) return 1;
  return Math.exp(-(distance * distance) / WAVE_SIGMA_SQ);
};

/** Linked EQ wave from a frozen gesture anchor (not from live waved levels). */
const applyEqualizerWave = (
  anchor: readonly number[],
  activeIndex: number,
  nextActiveValue: number,
): number[] => {
  const origin = anchor[activeIndex] ?? nextActiveValue;
  const delta = nextActiveValue - origin;

  return anchor.map((level, bandIndex) => {
    const weight = equalizerFalloff(Math.abs(bandIndex - activeIndex));
    if (weight < WAVE_CUTOFF) return level;
    return clampPercentage(Math.round(level + delta * weight));
  });
};

/** Vertical EQ bands — dragging one band waves the neighbors. */
export const SliderEqualizerDemo: React.FC = () => {
  const [levels, setLevels] = React.useState<number[]>([
    ...equalizerPresets.flat,
  ]);
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

  const applyPreset = (preset: keyof typeof equalizerPresets) => {
    endGesture();
    const next = [...equalizerPresets[preset]];
    levelsRef.current = next;
    setLevels(next);
  };

  return (
    <SandboxShell height={420} label="Linked vertical equalizer Sliders">
      <FieldShell maxInlineSize="32rem">
        <Stack rowGap="m">
          <Stack columnGap="xs" direction="row" wrap>
            <Button
              size="s"
              variant="secondary"
              onClick={() => {
                applyPreset("flat");
              }}
            >
              Flat
            </Button>
            <Button
              size="s"
              variant="secondary"
              onClick={() => {
                applyPreset("bass");
              }}
            >
              Bass
            </Button>
            <Button
              size="s"
              variant="secondary"
              onClick={() => {
                applyPreset("vocal");
              }}
            >
              Vocal
            </Button>
            <Button
              size="s"
              variant="secondary"
              onClick={() => {
                applyPreset("bright");
              }}
            >
              Bright
            </Button>
          </Stack>
          <Surface color={2} hPadding="m" radius="m" vPadding="m">
            <Stack
              columnGap="xs"
              direction="row"
              hAlign="space-between"
              vAlign="end"
            >
              {equalizerBands.map((band, index) => (
                <Stack
                  key={band.id}
                  expandChildren
                  hAlign="center"
                  minWidth="3ch"
                  rowGap="s"
                  style={{ blockSize: "11rem" }}
                >
                  <Slider
                    aria-label={`${band.label} hertz band`}
                    max={100}
                    min={0}
                    orientation="vertical"
                    renderValue
                    thumbAriaLabel={`${band.label} hertz band`}
                    value={levels[index]}
                    onValueChange={(next) => {
                      onBandChange(index, readSliderValue(next));
                    }}
                    onValueCommitted={endGesture}
                  />
                  <Text
                    align="center"
                    data-grow="false"
                    data-shrink="false"
                    family="mono"
                    size="xs"
                    tone="muted"
                  >
                    {band.label}
                  </Text>
                </Stack>
              ))}
            </Stack>
          </Surface>
        </Stack>
      </FieldShell>
    </SandboxShell>
  );
};
