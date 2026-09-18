import type { CSSProperties } from "react";
import styles from "@/components/HeroVisual.module.css";

const inputPaths = [
  "M 210 100 C 285 96, 315 125, 370 175",
  "M 215 280 C 285 280, 320 278, 380 282",
  "M 225 455 C 295 444, 325 405, 385 372",
];

const outputPaths = [
  "M 690 172 C 755 145, 790 108, 850 98",
  "M 715 282 C 770 282, 805 282, 855 282",
  "M 692 390 C 755 414, 795 450, 850 462",
];

const flowPaths = [
  ...inputPaths.map((d, index) => ({ d, gradient: "url(#flow-input)", delay: index * 0.25 })),
  ...outputPaths.map((d, index) => ({ d, gradient: "url(#flow-output)", delay: 0.8 + index * 0.25 })),
];

export default function HeroVisualFlow() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox="0 0 1000 562.5"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="flow-input" x1="210" y1="0" x2="385" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8DE9DB" />
          <stop offset="1" stopColor="#66E0D2" />
        </linearGradient>
        <linearGradient id="flow-output" x1="690" y1="0" x2="855" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#66E0D2" />
          <stop offset="1" stopColor="#5FD7E8" />
        </linearGradient>
        <filter id="flow-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      <g fill="none" strokeLinecap="round" filter="url(#flow-glow)" opacity="0.1">
        {flowPaths.map(({ d, gradient }) => (
          <path key={`glow-${d}`} d={d} stroke={gradient} strokeWidth="16" />
        ))}
      </g>

      <g fill="none" strokeLinecap="round" opacity="0.3">
        {flowPaths.map(({ d, gradient }) => (
          <path key={d} d={d} stroke={gradient} strokeWidth="7" />
        ))}
      </g>

      <g fill="none" strokeLinecap="round" opacity="0.92">
        {flowPaths.map(({ d, gradient, delay }) => (
          <path
            key={`pulse-${d}`}
            d={d}
            pathLength="100"
            stroke={gradient}
            strokeWidth="7"
            className={styles.flowPulse}
            style={{ animationDelay: `${delay}s` } as CSSProperties}
          />
        ))}
      </g>
    </svg>
  );
}
