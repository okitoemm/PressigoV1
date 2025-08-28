import type { SVGProps } from "react";

export function JacketIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M20 20a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.3a1 1 0 0 1-.9-.5L14.3 2.7a1 1 0 0 0-1.8 0L11.2 4.5a1 1 0 0 1-.9.5H7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2" />
      <path d="M12 11v11" />
    </svg>
  );
}
