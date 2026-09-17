import nested from "@viraui/foundation/vira/nested" with { type: "json" };

/**
 * Docs-root token bridge — only `--global-*` / `--highlight-*`.
 * Full `vira.css` stays in ViraSandbox (iframe). Root must not load
 * `--radius-*` / `--color-*` (clash with Tailwind theme).
 */
function tokenBlock(prefix: string, tokens: Record<string, string>): string {
  return Object.entries(tokens)
    .map(([name, value]) => `  --${prefix}-${name}: ${value};`)
    .join("\n");
}

export const viraDocsBridgeCss = `:root {
${tokenBlock("global", nested.global)}
${tokenBlock("highlight", nested.highlight)}
}
`;
