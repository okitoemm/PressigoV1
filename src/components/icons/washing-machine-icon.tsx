import type { SVGProps } from "react";

export function WashingMachineIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="2" />
      <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0" />
      <path d="M18 6h.01" />
      <path d="M15 6h.01" />
    </svg>
  );
}
