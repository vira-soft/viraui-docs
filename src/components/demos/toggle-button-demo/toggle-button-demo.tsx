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
import { ViraSandbox } from "../../common/vira-sandbox";

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
