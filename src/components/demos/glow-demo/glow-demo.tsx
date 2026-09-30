"use client";

import * as React from "react";
import { DotsThreeVertical } from "@phosphor-icons/react";
import {
  Glow,
  IconButton,
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

type FeatureCardProps = {
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ description, title }) => (
  <Surface border="all" color={2} hPadding="l" radius="auto" vPadding="l">
    <Stack maxWidth="12rem" rowGap="s">
      <Title render={<h3 />} size="5">
        {title}
      </Title>
      <Text render={<p />} size="s" tone="muted">
        {description}
      </Text>
    </Stack>
  </Surface>
);

/** Shared pointer glow across a small feature grid. */
export const GlowGridDemo: React.FC = () => (
  <SandboxShell height={340} label="Feature cards with shared pointer glow">
    <Stack
      columnGap="l"
      direction="row"
      rowGap="l"
      style={{ maxInlineSize: "36rem" }}
      wrap
    >
      <Glow fitContent radius="l">
        <FeatureCard
          description="Ship polished screens without reinventing chrome."
          title="Design"
        />
      </Glow>
      <Glow fitContent radius="l">
        <FeatureCard
          description="Accessible primitives wired for agent-led builds."
          title="Build"
        />
      </Glow>
      <Glow fitContent radius="l">
        <FeatureCard
          description="Theme tokens and motion that stay on-brand."
          title="Ship"
        />
      </Glow>
    </Stack>
  </SandboxShell>
);

/** Rainbow multi-stop highlight on a single hero card. */
export const GlowRainbowDemo: React.FC = () => (
  <SandboxShell height={240} label="Rainbow glow on a featured card">
    <Glow borderOffset={0} fitContent radius="l" rainbowColors>
      <Surface border="all" color={2} hPadding="l" radius="auto" vPadding="l">
        <Stack maxWidth="18rem" rowGap="s">
          <Title render={<h3 />} size="4">
            Featured plan
          </Title>
          <Text render={<p />} size="s" tone="muted">
            Move the pointer near the card to see the rainbow arc follow.
          </Text>
        </Stack>
      </Surface>
    </Glow>
  </SandboxShell>
);

/** Pill report rows with a tight proximity glow. */
export const GlowReportRowDemo: React.FC = () => (
  <SandboxShell height={280} label="Report rows with pointer glow">
    <Surface border="all" color={1} hPadding="m" radius="l" vPadding="m">
      <Stack rowGap="m">
        <Stack hAlign="center" rowGap="xs">
          <Title align="center" render={<h3 />} size="6">
            Recent reports
          </Title>
          <Text align="center" render={<p />} size="s" tone="muted">
            Move near a row to light the rim.
          </Text>
        </Stack>
        <Stack rowGap="s">
          <Glow
            borderOffset={0}
            borderWidth={1}
            proximity={10}
            radius="full"
          >
            <Surface
              color={2}
              hPadding="m"
              overflow="hidden"
              radius="full"
              vPadding="m"
            >
              <Stack
                columnGap="m"
                direction="row"
                hAlign="space-between"
                vAlign="center"
              >
                <Stack rowGap="s">
                  <Text weight="semibold">Q2 payout report</Text>
                  <Text size="s" tone="muted">
                    PDF · Updated 2 hours ago · 14 pages
                  </Text>
                </Stack>
                <IconButton
                  aria-label="More actions for Q2 payout report"
                  icon={<DotsThreeVertical size={16} />}
                  pill
                  size="s"
                  variant="flat"
                />
              </Stack>
            </Surface>
          </Glow>
          <Glow
            borderOffset={0}
            borderWidth={1}
            proximity={10}
            radius="full"
          >
            <Surface
              color={2}
              hPadding="m"
              overflow="hidden"
              radius="full"
              vPadding="m"
            >
              <Stack
                columnGap="m"
                direction="row"
                hAlign="space-between"
                vAlign="center"
              >
                <Stack rowGap="s">
                  <Text weight="semibold">SEPA batch export</Text>
                  <Text size="s" tone="muted">
                    CSV · Generated yesterday · 1,284 rows
                  </Text>
                </Stack>
                <IconButton
                  aria-label="More actions for SEPA batch export"
                  icon={<DotsThreeVertical size={16} />}
                  pill
                  size="s"
                  variant="flat"
                />
              </Stack>
            </Surface>
          </Glow>
        </Stack>
      </Stack>
    </Surface>
  </SandboxShell>
);
