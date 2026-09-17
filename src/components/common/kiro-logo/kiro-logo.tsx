import type { SVGProps } from "react";

/** Kiro brand mark (from official Add-to-Kiro badge). Fills with currentColor. */
export function KiroLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="10 0 110 140"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-label="Kiro"
      {...props}
    >
      <path d="M22.95 111.59c-14.89 33.01 16.82 41.28 40.21 21.97 6.87 21.66 32.67 5.5 41.92-11.28 20.39-36.98 12.16-74.71 10.04-82.49-14.5-53.07-86.95-53.12-99.42.27-2.91 9.34-2.96 19.97-4.61 31.01-.83 5.56-1.42 9.12-3.57 14.97-1.24 3.36-2.94 6.35-5.62 11.39-5.29 8.08.1 24.61 21.04 14.17z" />
    </svg>
  );
}
