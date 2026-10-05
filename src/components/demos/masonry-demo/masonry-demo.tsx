"use client";

import * as React from "react";
import {
  Elevator,
  Masonry,
  Stack,
  Surface,
  Text,
  Title,
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
  height = 480,
}) => (
  <ViraSandbox
    dialogShell={false}
    height={height}
    label={label}
    resizable
    vAlign="start"
  >
    <Stack fullWidth style={{ inlineSize: "100%" }}>
      {children}
    </Stack>
  </ViraSandbox>
);

type GalleryShot = {
  title: string;
  caption: string;
  seed: string;
  height: number;
};

const GALLERY_SHOTS: readonly GalleryShot[] = [
  {
    title: "Lobby dawn",
    caption: "Soft side light across the reception desk.",
    seed: "vira-masonry-lobby",
    height: 160,
  },
  {
    title: "Studio corner",
    caption: "Draft boards and sample prints stacked for review.",
    seed: "vira-masonry-studio",
    height: 240,
  },
  {
    title: "Rooftop terrace",
    caption: "Evening glow on the outdoor seating.",
    seed: "vira-masonry-rooftop",
    height: 180,
  },
  {
    title: "Material shelf",
    caption: "Fabric swatches and finish samples from the last sprint.",
    seed: "vira-masonry-materials",
    height: 220,
  },
  {
    title: "Wayfinding",
    caption: "Floor markers before the lobby refresh ships.",
    seed: "vira-masonry-wayfinding",
    height: 140,
  },
  {
    title: "Focus booth",
    caption: "Quiet booth booked for the design critique.",
    seed: "vira-masonry-booth",
    height: 200,
  },
  {
    title: "Sample wall",
    caption: "Pinned comps waiting on brand sign-off.",
    seed: "vira-masonry-samples",
    height: 260,
  },
  {
    title: "Cafe nook",
    caption: "Morning light on the shared kitchen counter.",
    seed: "vira-masonry-cafe",
    height: 170,
  },
] as const;

type EditorialCard = {
  title: string;
  body: string;
  color: 1 | 2 | 3;
};

const EDITORIAL_CARDS: readonly EditorialCard[] = [
  {
    title: "Atlas",
    body: "Short block for baseline column packing.",
    color: 2,
  },
  {
    title: "Beacon",
    body: "Longer copy stretches the tile so neighboring columns show the uneven flow across the wall.",
    color: 2,
  },
  {
    title: "Comet",
    body: "Compact card.",
    color: 3,
  },
  {
    title: "Delta",
    body: "Medium card with enough text to create vertical variation inside the masonry layout.",
    color: 2,
  },
  {
    title: "Echo",
    body: "A slim status tile.",
    color: 1,
  },
  {
    title: "Fjord",
    body: "Taller editorial block with two sentences so later columns pick up the stagger without forcing equal row heights.",
    color: 2,
  },
  {
    title: "Grove",
    body: "Supporting notes for a realistic dashboard wall.",
    color: 3,
  },
  {
    title: "Harbor",
    body: "Compact status card.",
    color: 2,
  },
] as const;

const BREAKPOINT_CARDS = [
  {
    title: "North wing",
    body: "Custom min-width keys are CSS px against the Masonry root — not the viewport.",
  },
  {
    title: "South atrium",
    body: "Resize the sandbox to watch columns step from one to three.",
  },
  {
    title: "East gallery",
    body: "Largest matching breakpoint wins when keys are unsorted.",
  },
  {
    title: "West lounge",
    body: "Neighbor tile keeps multi-column packing visible.",
  },
  {
    title: "Mezzanine",
    body: "Default stays one column until the root clears 640px.",
  },
  {
    title: "Courtyard",
    body: "At 1152px the wall opens to three tracks.",
  },
] as const;

/** Default responsive gallery — built-in breakpointCols schedule. */
export const MasonryResponsiveGalleryDemo: React.FC = () => (
  <SandboxShell
    height={520}
    label="Responsive Masonry image gallery"
  >
    <Masonry aria-label="Workspace photo gallery" gap="m">
      {GALLERY_SHOTS.map((shot) => (
        <Masonry.Item key={shot.title}>
          <Elevator resting={1}>
            <Surface border="all" color={2} overflow="hidden" radius="m">
              <Stack>
                <img
                  alt=""
                  height={shot.height}
                  src={`https://picsum.photos/seed/${shot.seed}/480/${shot.height}`}
                  style={{
                    blockSize: shot.height,
                    inlineSize: "100%",
                    objectFit: "cover",
                  }}
                  width={480}
                />
                <Stack hPadding="m" rowGap="2xs" vPadding="m">
                  <Title render={<h3 />} size="5">
                    {shot.title}
                  </Title>
                  <Text render={<p />} size="s" tone="muted">
                    {shot.caption}
                  </Text>
                </Stack>
              </Stack>
            </Surface>
          </Elevator>
        </Masonry.Item>
      ))}
    </Masonry>
  </SandboxShell>
);

/** Custom breakpointCols map on the Masonry root. */
export const MasonryCustomBreakpointsDemo: React.FC = () => (
  <SandboxShell
    height={420}
    label="Masonry with custom breakpointCols map"
  >
    <Masonry
      aria-label="Campus zones"
      breakpointCols={{ default: 1, 640: 2, 1152: 3 }}
      gap="l"
    >
      {BREAKPOINT_CARDS.map((card) => (
        <Masonry.Item key={card.title}>
          <Elevator resting={1}>
            <Surface border="all" color={2} radius="m">
              <Stack hPadding="l" rowGap="s" vPadding="l">
                <Title render={<h3 />} size="5">
                  {card.title}
                </Title>
                <Text render={<p />} size="s" tone="muted">
                  {card.body}
                </Text>
              </Stack>
            </Surface>
          </Elevator>
        </Masonry.Item>
      ))}
    </Masonry>
  </SandboxShell>
);

/** Variable-height Surface tiles packed into columns. */
export const MasonryVariableHeightDemo: React.FC = () => (
  <SandboxShell height={480} label="Masonry with variable-height Surface tiles">
    <Masonry aria-label="Editorial card wall" gap="l">
      {EDITORIAL_CARDS.map((card) => (
        <Masonry.Item key={card.title}>
          <Elevator resting={1}>
            <Surface
              border="all"
              color={card.color}
              hoverColor={3}
              radius="m"
            >
              <Stack hPadding="l" rowGap="s" vPadding="l">
                <Text weight="semibold">{card.title}</Text>
                <Text tone="muted">{card.body}</Text>
              </Stack>
            </Surface>
          </Elevator>
        </Masonry.Item>
      ))}
    </Masonry>
  </SandboxShell>
);
