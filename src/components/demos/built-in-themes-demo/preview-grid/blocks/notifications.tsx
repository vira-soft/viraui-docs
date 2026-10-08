"use client";

import * as React from "react";
import { Field } from "@base-ui/react";
import { Button, Checkbox, Stack, Surface, Text, Title } from "@viraui/react";

type NotificationsBlockProps = React.ComponentPropsWithoutRef<typeof Surface>;

/** Design Kitchen Notifications card — checkbox field list. */
export const NotificationsBlock: React.FC<NotificationsBlockProps> = ({
  ...otherProps
}) => {
  const [transactionAlerts, setTransactionAlerts] = React.useState(true);
  const [securityAlerts, setSecurityAlerts] = React.useState(true);
  const [goalMilestones, setGoalMilestones] = React.useState(false);
  const [marketUpdates, setMarketUpdates] = React.useState(false);

  const allSelected =
    transactionAlerts && securityAlerts && goalMilestones && marketUpdates;
  const partiallySelected =
    !allSelected &&
    [transactionAlerts, securityAlerts, goalMilestones, marketUpdates].some(
      Boolean,
    );

  const setAllNotifications = (checked: boolean) => {
    setTransactionAlerts(checked);
    setSecurityAlerts(checked);
    setGoalMilestones(checked);
    setMarketUpdates(checked);
  };

  return (
    <Surface
      border="all"
      color={1}
      radius="l"
      style={{ overflow: "hidden" }}
      {...otherProps}
    >
      <Stack rowGap="m">
        <Stack hPadding="m" rowGap="m" vPadding="m">
          <Stack rowGap="xs" vPadding={[0, "m"]}>
            <Title render={<h2 />} size="6">
              Notifications
            </Title>
            <Text size="s" tone="muted">
              Choose what you want to be notified about.
            </Text>
          </Stack>

          <Field.Root name="select-all-notifications">
            <Checkbox
              checked={allSelected}
              indeterminate={partiallySelected}
              label="Select all"
              onCheckedChange={(checked) =>
                setAllNotifications(checked === true)
              }
            />
          </Field.Root>

          <Field.Root name="transaction-alerts">
            <Checkbox
              checked={transactionAlerts}
              description="Deposits, withdrawals, and transfers."
              label="Transaction alerts"
              onCheckedChange={(checked) =>
                setTransactionAlerts(checked === true)
              }
            />
          </Field.Root>

          <Field.Root name="security-alerts">
            <Checkbox
              checked={securityAlerts}
              description="Login attempts and account changes."
              label="Security alerts"
              onCheckedChange={(checked) =>
                setSecurityAlerts(checked === true)
              }
            />
          </Field.Root>

          <Field.Root name="goal-milestones">
            <Checkbox
              checked={goalMilestones}
              description="Updates at 25%, 50%, 75%, and 100%."
              label="Goal milestones"
              onCheckedChange={(checked) =>
                setGoalMilestones(checked === true)
              }
            />
          </Field.Root>

          <Field.Root name="market-updates">
            <Checkbox
              checked={marketUpdates}
              description="Daily portfolio summary and price alerts."
              label="Market updates"
              onCheckedChange={(checked) =>
                setMarketUpdates(checked === true)
              }
            />
          </Field.Root>
        </Stack>

        <Surface color={2} hPadding="l" vPadding="m">
          <Button>Save Preferences</Button>
        </Surface>
      </Stack>
    </Surface>
  );
};
