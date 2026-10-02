"use client";

import * as React from "react";
import { MagnifyingGlass, MagnifyingGlassIcon } from "@phosphor-icons/react";
import {
  Autocomplete,
  Avatar,
  Spinner,
  Stack,
  Text,
} from "@viraui/react";
import {
  useViraSandboxDocument,
  ViraSandbox,
} from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 420,
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

type Reviewer = {
  id: string;
  label: string;
  role: string;
  fallback: string;
  src: string;
};

const reviewers: Reviewer[] = [
  {
    id: "r1",
    label: "Sarah Chen",
    role: "Product Design",
    fallback: "SC",
    src: "https://mockmind-api.uifaces.co/content/human/80.jpg",
  },
  {
    id: "r2",
    label: "Marcus Reed",
    role: "Engineering",
    fallback: "MR",
    src: "https://mockmind-api.uifaces.co/content/human/219.jpg",
  },
  {
    id: "r3",
    label: "Elena Voss",
    role: "Compliance",
    fallback: "EV",
    src: "https://mockmind-api.uifaces.co/content/human/128.jpg",
  },
  {
    id: "r4",
    label: "Jordan Park",
    role: "Customer Success",
    fallback: "JP",
    src: "https://mockmind-api.uifaces.co/content/human/48.jpg",
  },
];

type Category = {
  id: string;
  label: string;
};

const expenseCategories: Category[] = [
  { id: "c1", label: "SaaS subscriptions" },
  { id: "c2", label: "Travel" },
  { id: "c3", label: "Contractors" },
];

type Desk = {
  id: string;
  label: string;
  hours: string;
};

type DeskGroup = {
  value: string;
  items: Desk[];
};

const transferDesks: DeskGroup[] = [
  {
    value: "Europe",
    items: [
      { id: "d1", label: "Paris", hours: "09:00–18:00 CET" },
      { id: "d2", label: "Berlin", hours: "08:00–17:00 CET" },
    ],
  },
  {
    value: "Americas",
    items: [{ id: "d3", label: "Austin", hours: "08:00–17:00 CT" }],
  },
];

type Article = {
  id: string;
  title: string;
  section: string;
};

const helpArticles: Article[] = [
  { id: "a1", title: "Wire transfer limits", section: "Payments" },
  { id: "a2", title: "SEPA credit transfers", section: "Payments" },
  { id: "a3", title: "Tax form W-9", section: "Compliance" },
];

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

/** Teammate search with avatar item addons, search chrome, and selected endAddon. */
export const AutocompleteReviewerDemo: React.FC = () => {
  const [value, setValue] = React.useState("");
  const selected = reviewers.find((person) => person.label === value);

  return (
    <SandboxShell label="Assign reviewer Autocomplete with avatar rows">
      <PortalHost>
        {(container) => (
          <FieldShell>
            <Autocomplete
              container={container}
              description="Pick a teammate who can approve this payout batch."
              empty="No teammates match that name."
              endAddon={
                selected ? (
                  <Stack hPadding={[0, "xs"]}>
                    <Avatar
                      alt={selected.label}
                      fallback={selected.fallback}
                      size="xs"
                      src={selected.src}
                    />
                  </Stack>
                ) : undefined
              }
              itemToStringValue={(person: Reviewer) => person.label}
              items={reviewers}
              label="Assign reviewer"
              onValueChange={setValue}
              placeholder="Search by name…"
              startAddon={<MagnifyingGlassIcon aria-hidden size={16} />}
              value={value}
            >
              {(person: Reviewer) => (
                <Autocomplete.Item
                  key={person.id}
                  addon={
                    <Avatar
                      alt={person.label}
                      fallback={person.fallback}
                      size="s"
                      src={person.src}
                    />
                  }
                  value={person}
                >
                  {`${person.label} · ${person.role}`}
                </Autocomplete.Item>
              )}
            </Autocomplete>
          </FieldShell>
        )}
      </PortalHost>
    </SandboxShell>
  );
};

/** Free-form category suggest — typed values stay allowed. */
export const AutocompleteCategoryDemo: React.FC = () => (
  <SandboxShell height={380} label="Expense category Autocomplete">
    <PortalHost>
      {(container) => (
        <FieldShell>
          <Autocomplete
            container={container}
            description="Suggest a ledger category — free-form text stays allowed."
            empty="No category match. Keep typing to create a custom label."
            itemToStringValue={(category: Category) => category.label}
            items={expenseCategories}
            label="Expense category"
            placeholder="SaaS, travel, contractors…"
            startAddon={<MagnifyingGlass aria-hidden size={16} />}
          >
            {(category: Category) => (
              <Autocomplete.Item key={category.id} value={category}>
                {category.label}
              </Autocomplete.Item>
            )}
          </Autocomplete>
        </FieldShell>
      )}
    </PortalHost>
  </SandboxShell>
);

/** Grouped desks via Autocomplete.Group and Collection. */
export const AutocompleteGroupedDemo: React.FC = () => (
  <SandboxShell height={440} label="Transfer desk Autocomplete with groups">
    <PortalHost>
      {(container) => (
        <FieldShell>
          <Autocomplete
            container={container}
            description="Route an urgent payout to the desk covering that region."
            empty="No transfer desk matches."
            itemToStringValue={(desk: Desk) => desk.label}
            items={transferDesks}
            label="Transfer desk"
            placeholder="Paris, Berlin, Austin…"
            startAddon={<MagnifyingGlass aria-hidden size={16} />}
          >
            {(group: DeskGroup) => (
              <Autocomplete.Group
                key={group.value}
                items={group.items}
                label={group.value}
              >
                <Autocomplete.Collection>
                  {(desk: Desk) => (
                    <Autocomplete.Item key={desk.id} value={desk}>
                      {`${desk.label} · ${desk.hours}`}
                    </Autocomplete.Item>
                  )}
                </Autocomplete.Collection>
              </Autocomplete.Group>
            )}
          </Autocomplete>
        </FieldShell>
      )}
    </PortalHost>
  </SandboxShell>
);

/** Async help search — keep status mounted; update children while pending. */
export const AutocompleteAsyncDemo: React.FC = () => {
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<Article[]>([]);
  const [pending, setPending] = React.useState(false);

  React.useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setPending(false);
      return;
    }

    setPending(true);
    const timer = window.setTimeout(() => {
      const next = helpArticles.filter((article) => {
        const haystack = `${article.title} ${article.section}`.toLowerCase();
        return haystack.includes(trimmed.toLowerCase());
      });
      setResults(next);
      setPending(false);
    }, 280);

    return () => {
      window.clearTimeout(timer);
    };
  }, [query]);

  const status = pending ? (
    <Stack columnGap="s" direction="row" vAlign="center">
      <Spinner aria-hidden size="s" />
      <Text size="xs" tone="muted">
        Searching help center…
      </Text>
    </Stack>
  ) : query.trim() && results.length > 0 ? (
    <Text size="xs" tone="muted">
      {results.length} result{results.length === 1 ? "" : "s"}
    </Text>
  ) : null;

  const empty =
    pending || !query.trim() ? undefined : "No articles for that query.";

  return (
    <SandboxShell height={400} label="Async help-center Autocomplete">
      <PortalHost>
        {(container) => (
          <FieldShell>
            <Autocomplete
              container={container}
              description="Async docs search."
              empty={empty}
              filter={null}
              itemToStringValue={(article: Article) => article.title}
              items={results}
              label="Search help center"
              onValueChange={(next) => {
                setQuery(next);
              }}
              placeholder="Wire limits, SEPA, tax forms…"
              startAddon={<MagnifyingGlass aria-hidden size={16} />}
              status={status}
              value={query}
            >
              {(article: Article) => (
                <Autocomplete.Item key={article.id} value={article}>
                  {`${article.title} · ${article.section}`}
                </Autocomplete.Item>
              )}
            </Autocomplete>
          </FieldShell>
        )}
      </PortalHost>
    </SandboxShell>
  );
};
