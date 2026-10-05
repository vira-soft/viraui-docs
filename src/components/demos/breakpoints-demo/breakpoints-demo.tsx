"use client";

import * as React from "react";
import { House, SquaresFour, Sparkle } from "@phosphor-icons/react";
import {
  BreakpointsProvider,
  ButtonLink,
  Chip,
  Stack,
  Surface,
  Text,
  Title,
  useBreakpoints,
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
  height = 200,
}) => (
  <ViraSandbox dialogShell={false} height={height} label={label}>
    {children}
  </ViraSandbox>
);

const PanelShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Stack
    expandChildren
    fullWidth
    style={{
      inlineSize: "100%",
      maxInlineSize: "32rem",
      marginInline: "auto",
    }}
  >
    {children}
  </Stack>
);

/** Keep sandbox iframe from navigating when a demo link is activated. */
const holdHref = {
  href: "#",
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  },
} as const;

const studioNavLinks = [
  { label: "Hub", icon: <House /> },
  { label: "Studio", icon: <SquaresFour /> },
  { label: "Prompts", icon: <Sparkle /> },
] as const;

const DirectionNav: React.FC = () => {
  const isWide = useBreakpoints("small");

  return (
    <Surface border="all" color={1} hPadding="m" radius="l" vPadding="m">
      <Stack
        columnGap="xl"
        direction={isWide ? "row" : "column"}
        fullWidth
        hAlign={isWide ? "space-between" : "stretch"}
        render={<nav aria-label="Studio primary" />}
        rowGap="s"
        vAlign={isWide ? "center" : "stretch"}
      >
        <Stack rowGap="s">
          <Text weight="semibold">Vira Studio</Text>
          <Text size="s" tone="muted">
            {isWide
              ? "Row nav — small matches"
              : "Stacked nav — below small"}
          </Text>
        </Stack>
        <Stack
          columnGap="xs"
          direction={isWide ? "row" : "column"}
          expandChildren={!isWide}
          rowGap="xs"
          vAlign={isWide ? "center" : "stretch"}
        >
          {studioNavLinks.map((link) => (
            <ButtonLink
              key={link.label}
              {...holdHref}
              addon={link.icon}
              size="s"
              variant="secondary"
            >
              {link.label}
            </ButtonLink>
          ))}
        </Stack>
      </Stack>
    </Surface>
  );
};

/** Provider + named boolean — Stack direction flips when `small` matches. */
export const BreakpointsDirectionDemo: React.FC = () => (
  <SandboxShell
    height={220}
    label="BreakpointsProvider nav that flips Stack direction at small"
  >
    <PanelShell>
      <BreakpointsProvider>
        <DirectionNav />
      </BreakpointsProvider>
    </PanelShell>
  </SandboxShell>
);

const MatchRecordBoard: React.FC = () => {
  const matches = useBreakpoints();
  const activeNames = Object.keys(matches).filter((name) => matches[name]);

  return (
    <Surface border="all" color={1} hPadding="l" radius="l" vPadding="l">
      <Stack rowGap="m">
        <Stack rowGap="xs">
          <Title render={<h3 />} size="5">
            Match board
          </Title>
          <Text size="s" tone="muted">
            Full name → boolean record from the default provider map.
          </Text>
        </Stack>
        <Stack columnGap="xs" direction="row" rowGap="xs" wrap>
          {Object.keys(matches).map((name) => (
            <Chip
              key={name}
              variant={matches[name] ? "green" : "outline"}
            >
              {name}
            </Chip>
          ))}
        </Stack>
        <Text size="s" tone="muted">
          {activeNames.length > 0
            ? `Matching now: ${activeNames.join(", ")}`
            : "No min-width names match yet."}
        </Text>
      </Stack>
    </Surface>
  );
};

/** `useBreakpoints()` with no argument — full name → boolean record. */
export const BreakpointsRecordDemo: React.FC = () => (
  <SandboxShell
    height={280}
    label="BreakpointsProvider full match record board"
  >
    <PanelShell>
      <BreakpointsProvider>
        <MatchRecordBoard />
      </BreakpointsProvider>
    </PanelShell>
  </SandboxShell>
);

const productBreakpoints = {
  compact: "20em",
  wide: "50em",
} as const;

const CustomMapShell: React.FC = () => {
  const isWide = useBreakpoints("wide");

  return (
    <Surface border="all" color={1} overflow="hidden" radius="l">
      <Stack>
        <Stack hPadding="l" rowGap="xs" vPadding="l">
          <Title render={<h3 />} size="5">
            Atlas release desk
          </Title>
          <Text maxWidth="22rem" size="s" tone="muted">
            Custom map only knows compact and wide — defaults like small are
            gone for this subtree.
          </Text>
        </Stack>
        <Surface color={2} hPadding="l" vPadding="m">
          <Stack
            columnGap="m"
            direction={isWide ? "row" : "column"}
            hAlign={isWide ? "space-between" : "stretch"}
            rowGap="s"
            vAlign={isWide ? "center" : "stretch"}
          >
            <Text size="s" weight="semibold">
              {isWide
                ? "wide matches — actions sit in one row"
                : "Below wide — actions stack"}
            </Text>
            <Stack
              columnGap="s"
              direction={isWide ? "row" : "column"}
              expandChildren={!isWide}
              rowGap="s"
            >
              <ButtonLink {...holdHref} size="s" variant="secondary">
                Changelog
              </ButtonLink>
              <ButtonLink {...holdHref} size="s">
                Ship notes
              </ButtonLink>
            </Stack>
          </Stack>
        </Surface>
      </Stack>
    </Surface>
  );
};

/** `breakpoints` prop replaces the entire default map — no merge. */
export const BreakpointsCustomMapDemo: React.FC = () => (
  <SandboxShell
    height={280}
    label="BreakpointsProvider with custom compact and wide map"
  >
    <PanelShell>
      <BreakpointsProvider breakpoints={productBreakpoints}>
        <CustomMapShell />
      </BreakpointsProvider>
    </PanelShell>
  </SandboxShell>
);
