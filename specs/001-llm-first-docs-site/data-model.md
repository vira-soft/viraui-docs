# Data Model: LLM-First Human Docs Site

Content is file-based (no runtime DB). Entities map to filesystem + nav metadata.

## Section

- **Fields**: `id` (slug), `title`, `order`, `children[]`
- **Instances**: top-level intro pages (`why`, `principles`, `layers`), `get-started` (overview, setup, skills, mcp), `foundation`, `components`
- **Validation**: Every Section appears in root `content/meta.json` `pages` list.

## FoundationTopicPage

- **Fields**: `slug`, `title`, `stubStatus` (`placeholder` | `draft` | `ready`)
- **Required stubs**: foundation facets (colors, motion, elevation, …); theming under Get started (`/get-started/theming/…`)
- **Relationship**: child of Foundation section

## ComponentCategory

- **Fields**: `id`, `title`, `storybookPrefix` (e.g. `Actions`)
- **Instances**: Actions, Dialogs, Effects, Inputs, Layout, Loading, Navigation, Overlays, Typography, Widgets
- **Relationship**: children of Components overview; each owns ComponentPages

## ComponentPage

- **Fields**: `slug`, `displayName`, `categoryId`, `narrativeStub`, `hasPromptPlaceholder` (bool), `hasPreviewSlot` (bool)
- **Validation**: One page per public Storybook component leaf; no exhaustive prop-table primary body
- **Regions**: narrative → examples/preview → LLM prompt block

## PromptPlaceholder

- **Fields**: `pageSlug`, `label`, `body` (empty or TODO text for structure phase)
- **Used on**: Get started instructional pages + every ComponentPage (+ intro where instructions appear)

## DeploymentTarget

- **Fields**: `publicUrl` (`https://docs.viraui.dev`), `hostingProjectId`, `dnsRecord` (`docs` CNAME), `gitRemote` (`vira-soft/viraui-docs`, private), `gitLinkedToHost` (must be `false`)

## State transitions

- Page: `missing` → `stub` → `content-ready` (later feature)
- Deploy: `local-build` → `vercel-preview-url` → `custom-domain-attached`
