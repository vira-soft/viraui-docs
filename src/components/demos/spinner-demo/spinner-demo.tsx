"use client";

import * as React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import {
  Autocomplete,
  Button,
  Chip,
  Grid,
  Spinner,
  Stack,
  Text,
  type SpinnerVariant,
} from "@viraui/react";
import {
  useViraSandboxDocument,
  ViraSandbox,
  type ViraSandboxMode,
} from "../../common/vira-sandbox";

type Vendor = {
  id: string;
  label: string;
  region: string;
};

const vendors: Vendor[] = [
  { id: "v1", label: "Northwind Logistics", region: "EU" },
  { id: "v2", label: "Wireframe Studio", region: "US" },
  { id: "v3", label: "Sepia Freight", region: "EU" },
  { id: "v4", label: "Cascade Supplies", region: "APAC" },
];

/** Simulated remote latency for longer directory searches. */
const SEARCH_DELAY_MS = 1100;

/** Catalog motion styles only — legacy aliases share glyphs, so omit them here. */
const SPINNER_CATALOG_VARIANTS = [
  "arc",
  "atom",
  "blocks",
  "bouncing-dots",
  "cascade",
  "circular-dots",
  "classic",
  "classic-v2",
  "clock",
  "comet",
  "compass",
  "dual",
  "eclipse",
  "flip",
  "gather",
  "leap",
  "linear-dots",
  "loading",
  "morph",
  "orbit",
  "pulse",
  "radar",
  "ring",
  "ripple",
  "slide",
  "snake",
  "swirl",
  "trace",
  "wave",
] as const satisfies readonly SpinnerVariant[];

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
  mode?: ViraSandboxMode;
  vAlign?: "start" | "center";
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 220,
  mode,
  vAlign = "center",
}) => (
  <ViraSandbox
    dialogShell={false}
    height={height}
    label={label}
    mode={mode}
    vAlign={vAlign}
  >
    {children}
  </ViraSandbox>
);

type PortalHostProps = {
  children: (container: HTMLElement) => React.ReactNode;
};

/** Wait for iframe body so the popup portals inside the sandbox. */
const PortalHost: React.FC<PortalHostProps> = ({ children }) => {
  const { document: frameDoc } = useViraSandboxDocument();

  if (!frameDoc?.body) {
    return null;
  }

  return children(frameDoc.body);
};

const FieldShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Stack
    expandChildren
    fullWidth
    style={{
      inlineSize: "100%",
      maxInlineSize: "22rem",
      marginInline: "auto",
    }}
  >
    {children}
  </Stack>
);

/** Labeled grid of every catalog Spinner variant. */
export const SpinnerVariantsDemo: React.FC = () => (
  <SandboxShell
    height={360}
    label="Catalog Spinner variants in a labeled grid"
    vAlign="start"
  >
    <Grid
      colMinWidth="7.5rem"
      columnGap="l"
      filling="fill"
      hPadding="m"
      rowGap="5xl"
      style={{ inlineSize: "100%" }}
      vPadding="m"
    >
      {SPINNER_CATALOG_VARIANTS.map((variant) => (
        <Stack key={variant} hAlign="center" rowGap="s">
          <Spinner aria-hidden variant={variant} />
          <Text align="center" size="xs" tone="muted">
            {variant}
          </Text>
        </Stack>
      ))}
    </Grid>
  </SandboxShell>
);

/** Centered status region — decorative Spinner + muted wait copy. */
export const SpinnerCenteredDemo: React.FC = () => (
  <SandboxShell label="Centered Spinner status with muted wait copy">
    <Stack rowGap="s" hAlign="center" role="status" vPadding="l">
      <Spinner aria-hidden />
      <Text align="center" size="s" tone="muted">
        Fetching latest data
      </Text>
    </Stack>
  </SandboxShell>
);

/** Non-interactive Chip with trailing Spinner addon. */
export const SpinnerChipDemo: React.FC = () => (
  <SandboxShell height={140} label="Chip with trailing Spinner addon">
    <Chip addon={<Spinner aria-hidden size="s" />} addonPosition="end" variant="blue">
      Deploying
    </Chip>
  </SandboxShell>
);

/** Prefer Button `loading` over nesting a Spinner. */
export const SpinnerButtonLoadingDemo: React.FC = () => (
  <SandboxShell height={140} label="Idle Button beside Button with loading">
    <Stack columnGap="m" direction="row" wrap>
      <Button>Save</Button>
      <Button loading>Save</Button>
    </Stack>
  </SandboxShell>
);

/**
 * Autocomplete endAddon Spinner while a slower directory search resolves.
 * Seeds a query so the wait is visible on first paint; typing restarts it.
 */
export const SpinnerAutocompleteAddonDemo: React.FC = () => {
  const [query, setQuery] = React.useState("wire");
  const [results, setResults] = React.useState<Vendor[]>([]);
  const [pending, setPending] = React.useState(true);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setPending(false);
      setOpen(false);
      return;
    }

    setPending(true);
    setOpen(false);
    setResults([]);
    const timer = window.setTimeout(() => {
      const needle = trimmed.toLowerCase();
      setResults(
        vendors.filter((vendor) => {
          const haystack = `${vendor.label} ${vendor.region}`.toLowerCase();
          return haystack.includes(needle);
        }),
      );
      setPending(false);
      setOpen(true);
    }, SEARCH_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [query]);

  return (
    <SandboxShell height={360} label="Autocomplete with endAddon Spinner while searching">
      <PortalHost>
        {(container) => (
          <FieldShell>
            <Autocomplete
              container={container}
              description="Remote directory lookup — results arrive after a short wait."
              empty={pending || !query.trim() ? undefined : "No vendors match that query."}
              endAddon={
                pending && <Spinner aria-hidden size="s" variant="eclipse" />
              }
              filter={null}
              itemToStringValue={(vendor: Vendor) => vendor.label}
              items={results}
              label="Find vendor"
              onOpenChange={(next) => {
                if (!pending) {
                  setOpen(next);
                }
              }}
              onValueChange={(next) => {
                setQuery(next);
              }}
              open={pending ? false : open}
              placeholder="Name or region…"
              startAddon={<MagnifyingGlass aria-hidden size={16} />}
              value={query}
            >
              {(vendor: Vendor) => (
                <Autocomplete.Item key={vendor.id} value={vendor}>
                  {`${vendor.label} · ${vendor.region}`}
                </Autocomplete.Item>
              )}
            </Autocomplete>
          </FieldShell>
        )}
      </PortalHost>
    </SandboxShell>
  );
};
