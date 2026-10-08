"use client";

import * as React from "react";
import { Select, Separator, Stack, Surface, Text, Title } from "@viraui/react";
import {
  useViraSandboxDocument,
  ViraSandbox,
} from "../../common/vira-sandbox";

const DEFAULT_HEIGHT = 480;

const HEADING_TYPESCALE_VARIABLE = "--font-heading-typescale";
const BODY_TYPESCALE_VARIABLE = "--font-body-typescale";

const TITLE_SIZES = ["display", "1", "2", "3", "4", "5", "6"] as const;
const TEXT_SIZES = ["4xl", "3xl", "2xl", "xl", "l", "m", "s", "xs"] as const;

/** Modular scale presets — same set as Storybook typescale toolbar. */
const TYPESCALE_OPTIONS = [
  { value: "brand", label: "Brand default" },
  { value: "1.125", label: "1.125 – Major Second" },
  { value: "1.200", label: "1.200 – Minor Third" },
  { value: "1.250", label: "1.250 – Major Third" },
  { value: "1.333", label: "1.333 – Perfect Fourth" },
  { value: "1.414", label: "1.414 – Augmented Fourth" },
  { value: "1.500", label: "1.500 – Perfect Fifth" },
  { value: "1.618", label: "1.618 – Golden Ratio" },
] as const;

type TypescaleValue = (typeof TYPESCALE_OPTIONS)[number]["value"];

const typescaleValues = new Set<string>(
  TYPESCALE_OPTIONS.map((option) => option.value),
);

const typescaleItems = Object.fromEntries(
  TYPESCALE_OPTIONS.map((option) => [option.value, option.label]),
);

const resolveTypescale = (raw: string | null): TypescaleValue =>
  raw && typescaleValues.has(raw) ? (raw as TypescaleValue) : "brand";

type PortalHostProps = {
  children: (container: HTMLElement) => React.ReactNode;
};

/** Wait for iframe body so the Select popup portals inside the sandbox. */
const PortalHost: React.FC<PortalHostProps> = ({ children }) => {
  const { document: frameDoc } = useViraSandboxDocument();

  if (!frameDoc?.body) {
    return null;
  }

  return children(frameDoc.body);
};

type TypescaleRootOverrideProps = {
  cssVariable:
    | typeof HEADING_TYPESCALE_VARIABLE
    | typeof BODY_TYPESCALE_VARIABLE;
  ratio: TypescaleValue;
};

/**
 * Preflight derives `--font-scale-*` on `:root`. Registered length props
 * (`--vui-title-font-size`, …) only pick up ratio changes when the lever
 * lives on the iframe documentElement — child wrappers do not recompute.
 */
const TypescaleRootOverride: React.FC<TypescaleRootOverrideProps> = ({
  cssVariable,
  ratio,
}) => {
  const { document: frameDoc } = useViraSandboxDocument();

  React.useEffect(() => {
    const root = frameDoc?.documentElement;
    if (!root) {
      return;
    }

    if (ratio === "brand") {
      root.style.removeProperty(cssVariable);
    } else {
      root.style.setProperty(cssVariable, ratio);
    }

    return () => {
      root.style.removeProperty(cssVariable);
    };
  }, [frameDoc, cssVariable, ratio]);

  return null;
};

type ScaleSelectProps = {
  container: HTMLElement;
  label: string;
  value: TypescaleValue;
  onValueChange: (value: TypescaleValue) => void;
};

const ScaleSelect: React.FC<ScaleSelectProps> = ({
  container,
  label,
  value,
  onValueChange,
}) => {
  const handleValueChange = (next: string | null) => {
    onValueChange(resolveTypescale(next));
  };

  return (
    <Select
      container={container}
      items={typescaleItems}
      label={label}
      onValueChange={handleValueChange}
      value={value}
    >
      {TYPESCALE_OPTIONS.map((option) => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  );
};

type LadderRowProps = {
  label: string;
  children: React.ReactNode;
};

const LadderRow: React.FC<LadderRowProps> = ({ label, children }) => (
  <Surface border="all" hPadding="m" radius="m" vPadding="m">
    <Stack fullWidth rowGap="m">
      <Stack
        fullWidth
        style={{ inlineSize: "100%", minInlineSize: 0, overflowX: "auto" }}
      >
        {children}
      </Stack>
      <Separator />
      <Text size="xs" tone="muted">
        {label}
      </Text>
    </Stack>
  </Surface>
);

type TypescaleSandboxProps = {
  cssVariable:
    | typeof HEADING_TYPESCALE_VARIABLE
    | typeof BODY_TYPESCALE_VARIABLE;
  height: number;
  label: string;
  selectLabel: string;
  children: React.ReactNode;
};

const TypescaleSandbox: React.FC<TypescaleSandboxProps> = ({
  cssVariable,
  height,
  label,
  selectLabel,
  children,
}) => {
  const [ratio, setRatio] = React.useState<TypescaleValue>("brand");

  return (
    <ViraSandbox
      dialogShell={false}
      height={height}
      label={label}
      vAlign="start"
    >
      <TypescaleRootOverride cssVariable={cssVariable} ratio={ratio} />
      <PortalHost>
        {(container) => (
          <Stack
            expandChildren
            fullWidth
            rowGap="m"
            style={{ inlineSize: "100%" }}
          >
            <ScaleSelect
              container={container}
              label={selectLabel}
              onValueChange={setRatio}
              value={ratio}
            />
            <Stack expandChildren fullWidth rowGap="l">
              {children}
            </Stack>
          </Stack>
        )}
      </PortalHost>
    </ViraSandbox>
  );
};

export type TypographyTypescaleDemoProps = {
  /**
   * Preview canvas height in pixels for each sandbox.
   * @defaultValue 480
   */
  height?: number;
};

/**
 * Stacked Title and Text ladders. Each sandbox owns its typescale Select;
 * the ratio is written onto that iframe `:root`.
 */
export const TypographyTypescaleDemo: React.FC<TypographyTypescaleDemoProps> = ({
  height = DEFAULT_HEIGHT,
}) => (
  <div className="not-prose flex flex-col gap-3">
    <TypescaleSandbox
      cssVariable={HEADING_TYPESCALE_VARIABLE}
      height={height}
      label="Title sizes driven by heading typescale"
      selectLabel="Heading typescale"
    >
      {TITLE_SIZES.map((size) => (
        <LadderRow key={size} label={`size="${size}"`}>
          <Title fluid={false} lineHeight="s" size={size} whiteSpace="nowrap">
            Almost before
          </Title>
        </LadderRow>
      ))}
    </TypescaleSandbox>
    <TypescaleSandbox
      cssVariable={BODY_TYPESCALE_VARIABLE}
      height={height}
      label="Text sizes driven by body typescale"
      selectLabel="Body typescale"
    >
      {TEXT_SIZES.map((size) => (
        <LadderRow key={size} label={`size="${size}"`}>
          <Text size={size} whiteSpace="nowrap">
            Almost before we knew it, we had left the ground.
          </Text>
        </LadderRow>
      ))}
    </TypescaleSandbox>
  </div>
);
