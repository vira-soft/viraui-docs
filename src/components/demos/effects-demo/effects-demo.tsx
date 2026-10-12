"use client";

import * as React from "react";
import { Button, Stack, Surface, Switch, Text, Title } from "@viraui/react";
import {
  useViraSandboxDocument,
  ViraSandbox,
} from "../../common/vira-sandbox";

type EffectGateProps = {
  variable: "--effect-vibrancy" | "--effect-holofoil";
  enabled: boolean;
  /**
   * Holofoil brand default is `initial` (off) — empty setProperty removes the
   * declaration and falls back off. Space is a non-initial on sentinel.
   * Vibrancy brand default is empty (on) — remove the override when enabled.
   */
  enabledValue: "remove" | "space";
};

/** Sync a theme effect gate onto the sandbox iframe root (container `root`). */
const EffectGate: React.FC<EffectGateProps> = ({
  variable,
  enabled,
  enabledValue,
}) => {
  const { document: frameDoc } = useViraSandboxDocument();

  React.useEffect(() => {
    if (!frameDoc) {
      return;
    }

    const root = frameDoc.documentElement;

    if (enabled) {
      if (enabledValue === "space") {
        root.style.setProperty(variable, " ");
      } else {
        root.style.removeProperty(variable);
      }
    } else {
      root.style.setProperty(variable, "initial");
    }

    return () => {
      root.style.removeProperty(variable);
    };
  }, [enabled, enabledValue, frameDoc, variable]);

  return null;
};

/** Same glass asset the marketing site ships (Gumlet). */
const GLASS_BG_URL =
  "https://viraui.gumlet.io/glass-gradient-1.png?fm=webp&q=80";

const VIBRANCY_HEIGHT = 380;

const vibrancyShellStyle = {
  inlineSize: "100%",
  minBlockSize: VIBRANCY_HEIGHT,
  backgroundImage: `url(${GLASS_BG_URL})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
} satisfies React.CSSProperties;

type GateToggleCardProps = {
  checked: boolean;
  label: string;
  onCheckedChange: (next: boolean) => void;
};

/** Bordered Surface card Switch — same pattern as SwitchSurfaceCardDemo. */
const GateToggleCard: React.FC<GateToggleCardProps> = ({
  checked,
  label,
  onCheckedChange,
}) => (
  <Surface data-vibrant border="all" color={checked ? 3 : 1} radius="m">
    <Switch
      checked={checked}
      hPadding="m"
      label={label}
      onCheckedChange={onCheckedChange}
      vPadding="m"
    />
  </Surface>
);

const columnStyle = (maxInlineSize: string) =>
  ({
    inlineSize: "100%",
    maxInlineSize,
  }) satisfies React.CSSProperties;

/** Glass panel over full-bleed glass photo — Switch flips `--effect-vibrancy`. */
export const EffectsVibrancyDemo: React.FC = () => {
  const [enabled, setEnabled] = React.useState(true);

  const handleEnabledChange = (next: boolean) => {
    setEnabled(next);
  };

  return (
    <ViraSandbox
      dialogShell={false}
      height={VIBRANCY_HEIGHT}
      label="Vibrancy glass panel with theme gate toggle"
      padded={false}
      vAlign="start"
    >
      <EffectGate
        enabled={enabled}
        enabledValue="remove"
        variable="--effect-vibrancy"
      />
      <Stack
        hAlign="center"
        hPadding="l"
        style={vibrancyShellStyle}
        vAlign="center"
        vPadding="l"
      >
        <Stack expandChildren rowGap="m" style={columnStyle("16rem")}>
          <GateToggleCard
            checked={enabled}
            label="Vibrancy"
            onCheckedChange={handleEnabledChange}
          />
          <Surface
            border="all"
            color={1}
            data-vibrant
            hPadding="l"
            radius="l"
            vPadding="l"
          >
            <Stack rowGap="m">
              <Stack rowGap="s">
                <Title render={<h3 />} size="4">
                  Signal room
                </Title>
                <Text render={<p />} size="s" tone="muted">
                  Frosted glass only while the vibrancy gate stays on.
                </Text>
              </Stack>
              <Button variant="secondary">Join channel</Button>
            </Stack>
          </Surface>
        </Stack>
      </Stack>
    </ViraSandbox>
  );
};

/** Product card under the viewport foil — Switch flips `--effect-holofoil`. */
export const EffectsHolofoilDemo: React.FC = () => {
  const [enabled, setEnabled] = React.useState(true);

  const handleEnabledChange = (next: boolean) => {
    setEnabled(next);
  };

  return (
    <ViraSandbox
      dialogShell={false}
      height={340}
      label="Holofoil wash over a product card with theme gate toggle"
      vAlign="center"
    >
      <EffectGate
        enabled={enabled}
        enabledValue="space"
        variable="--effect-holofoil"
      />
      <Stack expandChildren rowGap="m" style={columnStyle("18rem")}>
        <GateToggleCard
          checked={enabled}
          label="Holofoil"
          onCheckedChange={handleEnabledChange}
        />
        <Surface border="all" color={1} hPadding="l" radius="l" vPadding="l">
          <Stack rowGap="m">
            <Stack rowGap="s">
              <Title render={<h3 />} size="4">
                Northline Studio
              </Title>
              <Text render={<p />} size="s" tone="muted">
                Foil wash paints the whole viewport when the holofoil gate is
                on — not a per-surface prop.
              </Text>
            </Stack>
            <Button>Open workspace</Button>
          </Stack>
        </Surface>
      </Stack>
    </ViraSandbox>
  );
};
