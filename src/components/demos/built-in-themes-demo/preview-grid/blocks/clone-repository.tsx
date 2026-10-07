"use client";

import * as React from "react";
import { ArrowDown, CopySimple, Desktop } from "@phosphor-icons/react";
import { Button, Stack, Surface, Tabs, Text, Textfield } from "@viraui/react";

type CloneRepositoryBlockProps = React.ComponentPropsWithoutRef<typeof Surface>;

/** Design Kitchen Clone Repository card — Tabs + clone URL. */
export const CloneRepositoryBlock: React.FC<CloneRepositoryBlockProps> = ({
  ...otherProps
}) => (
  <Surface
    border="all"
    color={1}
    hPadding="m"
    radius="l"
    style={{ overflow: "hidden" }}
    vPadding="m"
    {...otherProps}
  >
    <Tabs defaultValue="local" listAlignment="stretch">
      <Tabs.List>
        <Tabs.Tab value="codespaces">Codespaces</Tabs.Tab>
        <Tabs.Tab value="local">Local</Tabs.Tab>
      </Tabs.List>

      <Tabs.Viewport>
        <Tabs.Panel value="codespaces">
          <Stack expandChildren vPadding="m">
            <Surface
              border="all"
              color={2}
              hPadding="m"
              radius="l"
              vPadding="l"
            >
              <Text tone="muted">
                Create a cloud workspace from this repository.
              </Text>
            </Surface>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="local">
          <Stack expandChildren rowGap="m" vPadding={["m", 0]}>
            <Surface border="all" hPadding="m" radius="m" vPadding="m">
              <Stack rowGap="m">
                <Textfield
                  aria-label="Repository clone URL"
                  endAddon={<CopySimple size={16} />}
                  readOnly
                  value="https://github.com/vira-soft/vira-ui.git"
                />
                <Text tone="muted">Clone using the web URL.</Text>
              </Stack>
            </Surface>

            <Stack hAlign="start" rowGap="2xs">
              <Button addon={<Desktop size={18} />} size="s" variant="flat">
                Open with GitHub Desktop
              </Button>
              <Button addon={<ArrowDown size={18} />} size="s" variant="flat">
                Download ZIP
              </Button>
            </Stack>
          </Stack>
        </Tabs.Panel>
      </Tabs.Viewport>
    </Tabs>
  </Surface>
);
