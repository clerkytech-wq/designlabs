import React from "react";

export default function CircuitBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none overflow-hidden z-0"
    >
      <svg
        className="absolute left-0 top-0 h-full w-full max-w-[850px] opacity-[0.4] stroke-[#3d1203]/15 text-[#e8c580]"
        viewBox="0 0 800 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft radial glow in corner */}
        <defs>
          <radialGradient id="circuit-glow" cx="20%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#e8c580" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="800" height="700" fill="url(#circuit-glow)" />

        {/* Circuit Line 1 */}
        <path
          d="M 60 40 L 60 120 L 100 160 L 220 160 L 260 200 L 260 310 L 220 350 L 120 350"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#e8c580]/40"
        />
        <circle cx="60" cy="40" r="3" fill="#e8c580" />
        <circle cx="120" cy="350" r="3" fill="#e8c580" />

        {/* Circuit Line 2 */}
        <path
          d="M 120 40 L 120 100 L 170 150 L 340 150 L 380 190 L 380 270"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#3d1203]/20"
        />
        <circle cx="120" cy="40" r="3" fill="#3d1203" opacity="0.4" />
        <circle cx="380" cy="270" r="3.5" fill="#e8c580" />

        {/* Circuit Line 3 - sweeping down */}
        <path
          d="M 30 200 L 80 200 L 130 250 L 130 380 L 180 430 L 320 430 L 360 470 L 360 560 L 300 620"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#e8c580]/50"
        />
        <circle cx="30" cy="200" r="3" fill="#e8c580" />
        <circle cx="300" cy="620" r="3" fill="#e8c580" />

        {/* Circuit Line 4 */}
        <path
          d="M 200 40 L 200 80 L 250 130 L 450 130 L 490 170 L 490 230"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#3d1203]/15"
        />
        <circle cx="200" cy="40" r="2.5" fill="#3d1203" opacity="0.3" />
        <circle cx="490" cy="230" r="3" fill="#e8c580" />

        {/* Circuit Line 5 - lower left */}
        <path
          d="M 40 480 L 90 480 L 140 530 L 140 640 L 240 640 L 280 600"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#3d1203]/15"
        />
        <circle cx="40" cy="480" r="3" fill="#3d1203" opacity="0.3" />
        <circle cx="280" cy="600" r="3" fill="#e8c580" />

        {/* Branching nodes */}
        <path
          d="M 180 160 L 210 130 L 290 130"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#e8c580]/40"
        />
        <circle cx="290" cy="130" r="2.5" fill="#e8c580" />

        <path
          d="M 130 310 L 170 310 L 200 280"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#3d1203]/20"
        />
        <circle cx="200" cy="280" r="2.5" fill="#3d1203" opacity="0.4" />

        {/* Additional modern geometric micro-nodes */}
        <circle cx="160" cy="160" r="1.5" fill="#e8c580" />
        <circle cx="340" cy="150" r="1.5" fill="#3d1203" opacity="0.3" />
        <circle cx="130" cy="250" r="1.5" fill="#e8c580" />
        <circle cx="180" cy="430" r="2" fill="#e8c580" />
        <circle cx="320" cy="430" r="1.5" fill="#3d1203" opacity="0.3" />
      </svg>
    </div>
  );
}
