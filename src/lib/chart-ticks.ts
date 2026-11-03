/**
 * Width-aware domain tick thinning — mirror of Storybook charts helpers.
 * More plot width → more labels; never fewer than 2 when domain is non-empty.
 */

export const chartLabelMinPx = 72;

/** Thin point/band domain ticks so labels fit `plotWidth`. */
export function thinDomainTicks(
  domain: string[],
  plotWidth: number,
  minLabelPx = chartLabelMinPx,
): string[] {
  if (domain.length === 0 || plotWidth <= 0) {
    return [];
  }
  const maxTicks = Math.max(2, Math.floor(plotWidth / minLabelPx));
  if (domain.length <= maxTicks) {
    return domain.slice();
  }
  const step = Math.ceil(domain.length / maxTicks);
  return domain.filter((_, i) => i % step === 0);
}
