"use client";

import * as React from "react";
import {
  Bleed,
  Button,
  Separator,
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
  height = 360,
}) => (
  <ViraSandbox dialogShell={false} height={height} label={label}>
    {children}
  </ViraSandbox>
);

const PanelShell: React.FC<{
  children: React.ReactNode;
  maxInlineSize?: string;
}> = ({ children, maxInlineSize = "28rem" }) => (
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

const mediaBandStyle = {
  display: "block",
  inlineSize: "100%",
  blockSize: "8rem",
  objectFit: "cover",
} satisfies React.CSSProperties;

const heroMediaStyle = {
  display: "block",
  inlineSize: "100%",
  blockSize: "10rem",
  objectFit: "cover",
} satisfies React.CSSProperties;

/** Token `amount` matches parent `hPadding` so a media band kisses the Surface edges. */
export const BleedAmountDemo: React.FC = () => (
  <SandboxShell height={400} label="Bleed amount matching Surface padding">
    <PanelShell>
      <Surface border="all" color={1} overflow="hidden" radius="l">
        <Stack hPadding="l" rowGap="m" vPadding="l">
          <Stack rowGap="xs">
            <Title render={<h3 />} size="4">
              Harbor release notes
            </Title>
            <Text render={<p />} size="s" tone="muted">
              Shipping notes stay inset while the cover band below breaks past
              the card padding.
            </Text>
          </Stack>
          <Bleed amount="l">
            <img
              alt=""
              src="https://picsum.photos/seed/vira-bleed-amount/960/320"
              style={mediaBandStyle}
            />
          </Bleed>
          <Text render={<p />} size="s">
            Spotlight search, denser timelines, and quieter night mode land in
            this build — review the checklist before you push to production.
          </Text>
          <Button size="s" type="button" variant="secondary">
            Read full notes
          </Button>
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);

/** `full` reaches the sandbox viewport edges while section copy stays padded. */
export const BleedFullDemo: React.FC = () => (
  <SandboxShell height={420} label="Full viewport Bleed hero media">
    <Stack fullWidth rowGap="l" style={{ inlineSize: "100%" }}>
      <Stack hPadding="l" rowGap="xs">
        <Text size="xs" tone="muted" transform="uppercase" tracking="0.12rem">
          Field notes
        </Text>
        <Title render={<h3 />} size="3">
          Coastline capture kit
        </Title>
        <Text render={<p />} size="s" tone="muted">
          Intro copy keeps page margins while the hero below spans the full
          viewport width.
        </Text>
      </Stack>
      <Bleed full>
        <img
          alt=""
          src="https://picsum.photos/seed/vira-bleed-full/1280/400"
          style={heroMediaStyle}
        />
      </Bleed>
      <Stack hPadding="l" rowGap="m">
        <Text render={<p />} size="s">
          Pack the long lens, polarizer, and spare batteries — dusk shoots run
          cold and the tide does not wait.
        </Text>
        <Button size="s" type="button">
          Open kit list
        </Button>
      </Stack>
    </Stack>
  </SandboxShell>
);

/** Bleed a Separator so the rule hits the Surface chrome while siblings stay padded. */
export const BleedDividerDemo: React.FC = () => (
  <SandboxShell height={340} label="Bleed divider across padded section">
    <PanelShell>
      <Surface border="all" color={1} overflow="hidden" radius="l">
        <Stack hPadding="m" rowGap="m" vPadding="l">
          <Stack rowGap="xs">
            <Text size="s" weight="semibold">
              Workspace alerts
            </Text>
            <Text size="s" tone="muted">
              Choose which channels ping when a deploy lands or billing fails.
            </Text>
          </Stack>
          <Bleed amount="m">
            <Separator />
          </Bleed>
          <Stack
            columnGap="m"
            direction="row"
            hAlign="space-between"
            vAlign="center"
          >
            <Stack rowGap="xs">
              <Text size="s" weight="semibold">
                Email digest
              </Text>
              <Text size="xs" tone="muted">
                Morning summary at 8:00 local time.
              </Text>
            </Stack>
            <Button size="s" type="button" variant="secondary">
              Configure
            </Button>
          </Stack>
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);
