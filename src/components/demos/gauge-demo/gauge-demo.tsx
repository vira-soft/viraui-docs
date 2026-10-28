"use client";

import * as React from "react";
import { ArrowClockwise } from "@phosphor-icons/react";
import {
  Gauge,
  GaugeArc,
  GaugeControl,
  GaugeDot,
  GaugeHub,
  GaugeInset,
  GaugeMarks,
  GaugeNeedle,
  GaugeText,
  GaugeTickFill,
  GaugeTickLabels,
  GaugeTicks,
  GaugeTrack,
  GaugeValue,
  GaugeZones,
  IconButton,
  Stack,
  zoneColor,
  zoneCutoffs,
  type Zone,
} from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 320,
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

const RADIUS = 200;

/** Template pads use y-up fractions of radius — SVG is y-down. */
const pos = (x: number, y: number, radius = RADIUS) => ({
  x: x * radius,
  y: -y * radius,
});

type DialProps = {
  children: React.ReactNode;
  /** Match child `Gauge` `fit`. Square Dial locks 1:1 so row peers share height. */
  fit?: "square" | "content";
};

const Dial: React.FC<DialProps> = ({ children, fit = "square" }) => (
  <div
    style={{
      inlineSize: "14rem",
      maxInlineSize: "100%",
      ...(fit === "square" ? { aspectRatio: "1" } : {}),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);

const TOKEN = {
  foreground: "var(--global-foreground)",
  primary: "var(--global-primary)",
  contrast: "var(--global-contrast)",
  background: "var(--global-background)",
  red: "var(--highlight-red)",
} as const;

/** Baseline track + arc + centered value. */
export const GaugeSimpleDemo: React.FC = () => (
  <SandboxShell height={280} label="Simple dial">
    <Dial>
      <Gauge value={62} min={0} max={100} label="Reading">
        <GaugeTrack />
        <GaugeArc />
        <GaugeValue fontSize={104} />
      </Gauge>
    </Dial>
  </SandboxShell>
);

/** Full-circle completion ring beside a half-ring KPI. */
export const GaugeProgressRingDemo: React.FC = () => (
  <SandboxShell height={340} label="Progress and metric rings">
    <Stack columnGap="xl" direction="row" hAlign="center" vAlign="center" wrap>
      <Dial>
        <Gauge
          value={68}
          min={0}
          max={100}
          startAngle={0}
          endAngle={360}
          label="Complete"
        >
          <GaugeTrack width={20} />
          <GaugeArc width={20} />
          <GaugeValue fontSize={84} font="sans" weight="semibold" />
          <GaugeText fontSize={26} {...pos(0, -0.32)}>
            %
          </GaugeText>
          <GaugeText fontSize={20} {...pos(0, 0.34)}>
            Complete
          </GaugeText>
        </Gauge>
      </Dial>
      <Dial>
        <Gauge
          value={64}
          min={0}
          max={100}
          startAngle={90}
          endAngle={270}
          fit="content"
          label="Conversion rate"
        >
          <GaugeTrack width={28} />
          <GaugeArc width={28} />
          <GaugeValue fontSize={84} weight="semibold" {...pos(0, 0.22)} />
          <GaugeText fontSize={28} anchor="start" {...pos(0.27, 0.26)}>
            %
          </GaugeText>
          <GaugeText fontSize={20} {...pos(0, -0.04)}>
            Conversion rate
          </GaugeText>
        </Gauge>
      </Dial>
    </Stack>
  </SandboxShell>
);

const speedZones: Zone[] = [
  { to: 180, color: "var(--global-contrast)" },
  { to: 240, color: "var(--global-primary)" },
];

const tachZones: Zone[] = [
  { to: 6.5, color: TOKEN.contrast },
  { to: 8, color: TOKEN.red },
];

const fuelZones: Zone[] = [
  { to: 12, color: TOKEN.foreground },
  { to: 100, color: TOKEN.contrast },
];

/** Instrument dials: speed, tach, fuel in one row. */
export const GaugeZonesNeedleDemo: React.FC = () => (
  <SandboxShell height={360} label="Zones and needle dials">
    <Stack columnGap="l" direction="row" hAlign="center" vAlign="center" wrap>
      <Dial fit="content">
        <Gauge
          value={128}
          min={0}
          max={240}
          startAngle={40}
          endAngle={320}
          fit="content"
          label="Speed"
        >
          <GaugeZones
            zones={speedZones}
            width={8}
            gap={0}
            cap="butt"
            endCap="butt"
          />
          <GaugeMarks values={zoneCutoffs(speedZones)} length={8} width={2} />
          <GaugeTicks count={12} length={18} width={3} offset={-16} cap="butt" />
          <GaugeTicks
            count={48}
            length={8}
            width={1.5}
            offset={-12}
            cap="butt"
            opacity={0.6}
          />
          <GaugeTickLabels count={12} offset={-54} fontSize={20} weight="semibold" />
          <GaugeNeedle kind="pointer" length={0.85} width={10} tail={32} />
          <GaugeHub radius={12} />
          <GaugeValue
            fontSize={44}
            font="mono"
            weight="semibold"
            {...pos(0, -0.46)}
          />
          <GaugeText fontSize={18} {...pos(0, -0.64)}>
            km/h
          </GaugeText>
        </Gauge>
      </Dial>
      <Dial fit="content">
        <Gauge
          value={5.2}
          min={0}
          max={8}
          startAngle={40}
          endAngle={320}
          fit="content"
          label="Tachometer"
        >
          <GaugeZones
            zones={tachZones}
            width={10}
            offset={4}
            gap={0}
            cap="butt"
            endCap="butt"
          />
          <GaugeMarks values={zoneCutoffs(tachZones)} length={8} width={2} />
          <GaugeTicks count={8} length={18} width={3} offset={-16} cap="butt" />
          <GaugeTicks
            count={40}
            length={8}
            width={1.5}
            offset={-12}
            cap="butt"
            opacity={0.6}
          />
          <GaugeTickLabels count={8} offset={-52} fontSize={24} weight="bold" />
          <GaugeNeedle kind="pointer" length={0.88} width={10} tail={30} />
          <GaugeHub radius={12} />
          <GaugeValue
            decimals={1}
            fontSize={44}
            font="mono"
            weight="semibold"
            {...pos(0, -0.46)}
          />
          <GaugeText fontSize={16} {...pos(0, -0.64)}>
            x1000 rpm
          </GaugeText>
        </Gauge>
      </Dial>
      <Dial fit="content">
        <Gauge
          value={38}
          min={0}
          max={100}
          startAngle={90}
          endAngle={270}
          fit="content"
          label="Fuel"
        >
          <GaugeZones
            zones={fuelZones}
            width={10}
            gap={0}
            cap="butt"
            endCap="butt"
          />
          <GaugeTicks
            count={4}
            length={18}
            width={3}
            offset={-20}
            cap="butt"
            color={TOKEN.foreground}
          />
          <GaugeTicks
            count={16}
            length={8}
            width={1.5}
            offset={-15}
            cap="butt"
            opacity={0.5}
          />
          <GaugeNeedle kind="pointer" length={0.85} width={9} tail={24} />
          <GaugeHub radius={10} />
          <GaugeValue
            fontSize={36}
            font="mono"
            weight="semibold"
            {...pos(0, -0.42)}
          />
          <GaugeText
            fontSize={28}
            weight="bold"
            color={TOKEN.foreground}
            {...pos(0.8, -0.16)}
          >
            F
          </GaugeText>
          <GaugeText
            fontSize={28}
            weight="bold"
            color={TOKEN.foreground}
            {...pos(-0.8, -0.16)}
          >
            E
          </GaugeText>
        </Gauge>
      </Dial>
    </Stack>
  </SandboxShell>
);

/** Comfort band range beside a thermostat setpoint dial. */
export const GaugeDualRangeDemo: React.FC = () => (
  <SandboxShell height={340} label="Dual range and thermostat">
    <Stack columnGap="xl" direction="row" hAlign="center" vAlign="center" wrap>
      <Dial>
        <Gauge
          value={[19, 23]}
          min={10}
          max={30}
          startAngle={40}
          endAngle={320}
          label="Comfort"
        >
          <GaugeTrack width={28} cap="butt" />
          <GaugeArc width={28} opacity={0.35} cap="butt" />
          <GaugeTicks count={20} length={8} width={2} offset={-38} opacity={0.6} />
          <GaugeDot end="from" radius={16} />
          <GaugeDot end="to" radius={16} />
          <GaugeValue fontSize={76} font="rounded" weight="bold" {...pos(0, 0.02)} />
          <GaugeText fontSize={24} {...pos(0, -0.3)}>
            °C
          </GaugeText>
          <GaugeText fontSize={20} weight="semibold" {...pos(0, 0.36)}>
            Comfort
          </GaugeText>
        </Gauge>
      </Dial>
      <Dial>
        <Gauge
          value={21.5}
          min={10}
          max={30}
          startAngle={40}
          endAngle={320}
          label="Heating"
        >
          <GaugeTrack width={26} cap="butt" />
          <GaugeArc width={26} opacity={0.4} cap="butt" />
          <GaugeTicks
            count={80}
            length={30}
            width={2.5}
            offset={0}
            cap="butt"
            color={TOKEN.background}
            opacity={1}
          />
          <GaugeDot radius={13} />
          <GaugeValue
            decimals={1}
            fontSize={88}
            font="rounded"
            weight="bold"
            {...pos(0, 0.02)}
          />
          <GaugeText fontSize={24} {...pos(0, -0.32)}>
            °C
          </GaugeText>
          <GaugeText fontSize={20} weight="semibold" {...pos(0, 0.4)}>
            Heating
          </GaugeText>
        </Gauge>
      </Dial>
    </Stack>
  </SandboxShell>
);

const RING = {
  stand: "var(--highlight-cyan)",
  exercise: "var(--highlight-acid)",
  move: "var(--highlight-red)",
} as const;

/** Concentric activity rings via GaugeInset. */
export const GaugeNestedInsetDemo: React.FC = () => (
  <SandboxShell height={320} label="Nested activity rings">
    <Dial>
      <Gauge
        value={72}
        min={0}
        max={100}
        startAngle={180}
        endAngle={540}
        label="Move"
      >
        <GaugeTrack width={44} color={RING.move} opacity={0.18} />
        <GaugeArc width={44} color={RING.move} />
        <GaugeValue fontSize={52} font="rounded" weight="bold" {...pos(0, 0.08)} />
        <GaugeText fontSize={20} font="rounded" weight="semibold" {...pos(0, -0.12)}>
          Move
        </GaugeText>

        <GaugeInset
          value={48}
          min={0}
          max={100}
          startAngle={180}
          endAngle={540}
          scale={0.74}
        >
          <GaugeTrack width={60} color={RING.exercise} opacity={0.18} />
          <GaugeArc width={60} color={RING.exercise} />
        </GaugeInset>

        <GaugeInset
          value={90}
          min={0}
          max={100}
          startAngle={180}
          endAngle={540}
          scale={0.5}
        >
          <GaugeTrack width={76} color={RING.stand} opacity={0.18} />
          <GaugeArc width={76} color={RING.stand} />
        </GaugeInset>
      </Gauge>
    </Dial>
  </SandboxShell>
);

/** Discrete lit ticks instead of a continuous arc. */
export const GaugeSegmentFillDemo: React.FC = () => (
  <SandboxShell height={300} label="Segment fill">
    <Dial>
      <Gauge value={64} min={0} max={100} label="Segments">
        <GaugeTickFill
          count={40}
          length={28}
          litLength={40}
          width={7}
          color={TOKEN.primary}
          dimColor={TOKEN.contrast}
        />
        <GaugeValue fontSize={104} font="rounded" weight="bold" />
        <GaugeText fontSize={26} {...pos(0, -0.34)}>
          %
        </GaugeText>
      </Gauge>
    </Dial>
  </SandboxShell>
);

/** Polar knob via GaugeControl. */
export const GaugeInteractiveControlDemo: React.FC = () => {
  const [value, setValue] = React.useState(42);

  return (
    <SandboxShell height={360} label="Interactive volume knob">
      <div style={{ inlineSize: "16rem", maxInlineSize: "100%" }}>
        <GaugeControl
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          startAngle={40}
          endAngle={320}
          label="Volume"
          knob
        >
          <Gauge
            value={value}
            min={0}
            max={100}
            startAngle={40}
            endAngle={320}
            padding={56}
            transition={{ type: "spring", visualDuration: 0.3, bounce: 0 }}
            aria-hidden
          >
            <GaugeHub radius={156} color={TOKEN.contrast} />
            <GaugeTrack
              width={6}
              color={TOKEN.foreground}
              opacity={0.12}
              offset={-18}
            />
            <GaugeArc width={6} color={TOKEN.foreground} offset={-18} />
            <GaugeTicks
              count={20}
              length={12}
              width={3}
              offset={6}
              cap="round"
              color={TOKEN.contrast}
            />
            <GaugeDot radius={11} offset={-76} color={TOKEN.foreground} />
            <GaugeValue fontSize={64} font="rounded" weight="bold" />
          </Gauge>
        </GaugeControl>
      </div>
    </SandboxShell>
  );
};

/** Any valid CSS color works on zones / parts — hex, named, oklch, theme vars. */
const healthZones: Zone[] = [
  { to: 20, color: "#e11d48" },
  { to: 70, color: "goldenrod" },
  { to: 100, color: "var(--highlight-green)" },
];

const COLOR_SWEEP_MS = 3200;

/** Zone paint + live arc color; value sweeps so the active band changes. */
export const GaugeTokenColorsDemo: React.FC = () => {
  const [run, setRun] = React.useState(0);
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    let raf = 0;
    const start = performance.now();
    setValue(0);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COLOR_SWEEP_MS);
      setValue(Math.round(t * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run]);

  return (
    <SandboxShell height={340} label="Part colors with zone sweep">
      <Stack hAlign="center" rowGap="m" vAlign="center">
        <Dial>
          <Gauge value={value} min={0} max={100} label="Health">
            <GaugeTrack width={16} color="var(--global-contrast)" opacity={0.35} />
            <GaugeArc
              width={16}
              color={zoneColor(healthZones, value, TOKEN.foreground)}
            />
            <GaugeZones
              zones={healthZones}
              width={5}
              offset={-18}
              gap={1}
              cap="butt"
              endCap="round"
            />
            <GaugeValue fontSize={64} />
            <GaugeText
              fontSize={20}
              color="var(--global-muted)"
              {...pos(0, -0.34)}
            >
              status
            </GaugeText>
          </Gauge>
        </Dial>
        <IconButton
          aria-label="Replay color sweep"
          icon={<ArrowClockwise />}
          onClick={() => setRun((n) => n + 1)}
          variant="secondary"
        />
      </Stack>
    </SandboxShell>
  );
};
