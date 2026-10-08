"use client";

import * as React from "react";
import {
  AvatarGroup,
  Badge,
  Button,
  Stack,
  Surface,
  Text,
  Title,
} from "@viraui/react";

const emptyTeamAvatars = [
  {
    alt: "Team member one",
    fallback: "AL",
    src: "https://mockmind-api.uifaces.co/content/human/80.jpg",
  },
  {
    alt: "Team member two",
    fallback: "MR",
    src: "https://mockmind-api.uifaces.co/content/human/219.jpg",
  },
  {
    alt: "Team member three",
    fallback: "MR",
    src: "https://mockmind-api.uifaces.co/content/human/128.jpg",
  },
] as const;

type EmptyTeamBlockProps = React.ComponentPropsWithoutRef<typeof Surface>;

/** Design Kitchen Empty Team card — dashed empty state + Annotate CTA. */
export const EmptyTeamBlock: React.FC<EmptyTeamBlockProps> = ({
  ...otherProps
}) => {
  const [showBadge, setShowBadge] = React.useState(true);

  return (
    <Surface
      border="all"
      color={1}
      hPadding="m"
      radius="l"
      vPadding="m"
      {...otherProps}
    >
      <Stack
        hAlign="center"
        hPadding="l"
        rowGap="m"
        style={{
          border: "1px dashed var(--border-neutral-subtle)",
          borderRadius: "1.25rem",
        }}
        vPadding="2xl"
      >
        <AvatarGroup avatars={[...emptyTeamAvatars]} size="m" />

        <Title align="center" render={<h3 />} size="5">
          No Team Members
        </Title>
        <Text align="center" maxWidth="14rem" size="s" tone="muted">
          Invite your team to collaborate on this project.
        </Text>
          <Badge color="green" show={showBadge}>
            <Button onClick={() => setShowBadge((state) => !state)}>
              Invite Members
            </Button>
          </Badge>
      </Stack>
    </Surface>
  );
};
