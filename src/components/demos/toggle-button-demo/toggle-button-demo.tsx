"use client";

import * as React from "react";
import {
  Heart,
  Moon,
  PushPin,
  Sun,
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
  TextB,
  TextItalic,
  TextUnderline,
} from "@phosphor-icons/react";
import { Stack, Surface, ToggleButton, ToggleGroup } from "@viraui/react";
import {
  useViraSandboxCss,
  ViraSandbox,
} from "../../common/vira-sandbox";
import sparkCss from "./toggle-button-spark.module.css?inline";
import sparkStyles from "./toggle-button-spark.module.css";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
  vAlign?: "start" | "center";
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 112,
  vAlign = "center",
}) => (
  <ViraSandbox
    dialogShell={false}
    height={height}
    label={label}
    vAlign={vAlign}
  >
    {children}
  </ViraSandbox>
);

const SPARK_BURST = [
  { x: "0.15rem", y: "-1.35rem", color: "var(--highlight-yellow)" },
  { x: "1.1rem", y: "-0.85rem", color: "var(--highlight-salmon)" },
  { x: "1.35rem", y: "0.2rem", color: "var(--highlight-magenta)" },
  { x: "0.85rem", y: "1.1rem", color: "var(--highlight-purple)" },
  { x: "-0.2rem", y: "1.3rem", color: "var(--highlight-blue)" },
  { x: "-1.15rem", y: "0.75rem", color: "var(--highlight-green)" },
  { x: "-1.35rem", y: "-0.25rem", color: "var(--highlight-cyan)" },
  { x: "-0.75rem", y: "-1.1rem", color: "var(--highlight-acid)" },
] as const;

/** Standalone pin / favorite with resting and pressed icons. */
export const ToggleButtonIconsDemo: React.FC = () => (
  <SandboxShell label="ToggleButton: pin and favorite with icon swap">
    <Stack columnGap="m" direction="row" rowGap="m" wrap>
      <ToggleButton
        aria-label="Pin"
        pressedIcon={<PushPin weight="fill" />}
        restingIcon={<PushPin />}
      />
      <ToggleButton
        aria-label="Favorite"
        pressedIcon={<Heart weight="fill" />}
        restingIcon={<Heart />}
      />
    </Stack>
  </SandboxShell>
);

/** pressedVariant + interpolateIcons crossfade between glyphs. */
export const ToggleButtonPressedVariantDemo: React.FC = () => (
  <SandboxShell label="ToggleButton pressedVariant with interpolateIcons crossfade">
    <ToggleButton
      aria-label="Dark mode"
      interpolateIcons
      pressedIcon={<Sun />}
      pressedVariant="secondary"
      restingIcon={<Moon />}
    />
  </SandboxShell>
);

const ToggleButtonSparkScene: React.FC = () => {
  useViraSandboxCss(sparkCss);
  const [celebrate, setCelebrate] = React.useState(false);

  return (
    <div
      className={sparkStyles.Burst}
      {...(celebrate ? { "data-celebrate": "" } : {})}
    >
      <span aria-hidden className={sparkStyles.Sparks}>
        {SPARK_BURST.map((spark) => (
          <span
            key={`${spark.x}-${spark.y}`}
            className={sparkStyles.Spark}
            style={
              {
                "--spark-x": spark.x,
                "--spark-y": spark.y,
                "--spark-color": spark.color,
              } as React.CSSProperties
            }
          />
        ))}
      </span>
      <ToggleButton
        aria-label="Favorite"
        onPressedChange={(pressed) => {
          if (!pressed) {
            setCelebrate(false);
            return;
          }
          setCelebrate(false);
          requestAnimationFrame(() => setCelebrate(true));
        }}
        pressedIcon={<Heart weight="fill" />}
        pressedVariant="secondary"
        restingIcon={<Heart />}
      />
    </div>
  );
};

/** onPressedChange side effect: confetti stand-in when toggle turns on. */
export const ToggleButtonSparkDemo: React.FC = () => (
  <SandboxShell height={140} label="ToggleButton onPressedChange side effect">
    <ToggleButtonSparkScene />
  </SandboxShell>
);

/** Exclusive single-select toolbar via ToggleGroup. */
export const ToggleGroupSingleDemo: React.FC = () => (
  <SandboxShell label="ToggleGroup: exclusive text alignment">
    <Surface border="all" color={1} hPadding="2xs" radius="m" vPadding="2xs">
      <ToggleGroup aria-label="Text alignment" defaultValue={["left"]}>
        <ToggleButton
          aria-label="Align left"
          pressedVariant="secondary"
          restingIcon={<TextAlignLeft />}
          value="left"
        />
        <ToggleButton
          aria-label="Align center"
          pressedVariant="secondary"
          restingIcon={<TextAlignCenter />}
          value="center"
        />
        <ToggleButton
          aria-label="Align right"
          pressedVariant="secondary"
          restingIcon={<TextAlignRight />}
          value="right"
        />
      </ToggleGroup>
    </Surface>
  </SandboxShell>
);

/** Multi-select formatting toolbar. */
export const ToggleGroupMultipleDemo: React.FC = () => (
  <SandboxShell label="ToggleGroup multiple: bold, italic, underline">
    <Surface border="all" color={1} hPadding="2xs" radius="m" vPadding="2xs">
      <ToggleGroup
        aria-label="Text formatting"
        defaultValue={["bold"]}
        multiple
      >
        <ToggleButton
          aria-label="Bold"
          pressedVariant="secondary"
          restingIcon={<TextB />}
          value="bold"
        />
        <ToggleButton
          aria-label="Italic"
          pressedVariant="secondary"
          restingIcon={<TextItalic />}
          value="italic"
        />
        <ToggleButton
          aria-label="Underline"
          pressedVariant="secondary"
          restingIcon={<TextUnderline />}
          value="underline"
        />
      </ToggleGroup>
    </Surface>
  </SandboxShell>
);
