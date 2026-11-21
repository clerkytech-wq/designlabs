"use client";

import React from "react";
import Image from "next/image";
import { ArrowDownRight } from "lucide-react";

interface AboutSectionProps {
  onOpenContact: () => void;
}

const agencyStats = [
  { value: "4", labelTop: "Years of", labelBottom: "Experience" },
  { value: "120", labelTop: "Completed", labelBottom: "Projects" },
  { value: "45", labelTop: "Trusted", labelBottom: "Clients" },
];

export default function AboutSection({ onOpenContact }: AboutSectionProps) {
  return (
    <section
      id="about"
      className="relative w-full max-w-full overflow-x-clip overflow-y-hidden bg-[#080808] text-white py-14 sm:py-20 md:py-28 lg:py-32 px-3.5 sm:px-8 md:px-14 lg:px-20 border-t border-white/5 select-none"
    >
      {/* Background Ambient Terracotta Glow & Decorative Metallic Sculpture */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="absolute -top-10 -right-10 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-[#ba3d03]/15 blur-3xl" />

        {/* Decorative Metallic Sculpture in Top-Right Corner matching the inspiration */}
        <div className="absolute top-2 sm:top-4 -right-4 sm:right-2 md:right-8 w-40 sm:w-64 md:w-80 lg:w-[380px] aspect-[350/340] z-10 opacity-75 sm:opacity-90 transition-opacity">
          <Image
            src="/images/about-chrome-sculpture.png"
            alt="Reflective metallic ring sculpture"
            fill
            unoptimized
            priority
            className="object-contain object-top filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>

      <div className="relative z-20 max-w-6xl mx-auto">

        {/* Centerpiece Display Typography: "ABOUT US" + Arrow Button */}
        <div className="relative">
          {/* Vertical decorative guide-line along the left */}
          <div 
            className="absolute -left-2 sm:-left-4 top-2 bottom-2 w-[1px] bg-white/10 hidden sm:block" 
            aria-hidden="true" 
          />

          <div className="space-y-0.5 sm:space-y-2">
            {/* Solid Bold "ABOUT" */}
            <h2 className="text-[46px] sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-[0.95] drop-shadow-sm">
              ABOUT
            </h2>

            {/* Outlined "US" + Down-Right Arrow Button */}
            <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
              <span
                className="text-[46px] sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-transparent leading-[0.95] select-none"
                style={{
                  WebkitTextStroke: "2px #ffffff",
                }}
              >
                US
              </span>

              {/* Action Circle Button matching the inspiration */}
              <button
                onClick={onOpenContact}
                className="group w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-white hover:bg-[#ba3d03] text-zinc-950 hover:text-white flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-[#ba3d03]/40 cursor-pointer active:scale-95 shrink-0"
                aria-label="Get in touch with DesignLabs"
              >
                <ArrowDownRight className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 stroke-[2.5] text-zinc-950 group-hover:text-white group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all duration-200" />
              </button>
            </div>
          </div>
        </div>

        {/* Lower Narrative Manifesto Block */}
        <div className="mt-8 sm:mt-16 md:mt-20 max-w-2xl">
          {/* Vertical accent rule in brand terracotta color */}
          <div className="border-l-2 border-[#ba3d03] pl-3.5 sm:pl-6 py-0.5">
            <p className="text-zinc-300 text-xs sm:text-base md:text-lg leading-relaxed font-normal">
              We are <span className="text-white font-semibold">DesignLabs</span>, a creative agency with a passion for clean and powerful design. For over 4 years, we&apos;ve helped businesses build memorable brands through logo design, brand identity, and marketing. We believe in making your vision come to life.
            </p>
          </div>

          {/* Relocated Agency Statement & Metrics Strip matching black About theme */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-10 border-t border-white/10 space-y-5 sm:space-y-8">
            <div className="border-l border-white/25 pl-3.5 sm:pl-6">
              <p className="text-zinc-200 text-xs sm:text-base md:text-lg leading-relaxed max-w-md">
                We are a creative agency focused on quality, identity, and digital growth.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-10 md:gap-14 pl-3.5 sm:pl-6 max-w-xl">
              {agencyStats.map((stat) => (
                <div key={stat.labelBottom} className="min-w-0">
                  <div className="flex items-baseline gap-0.5 leading-none">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white leading-[0.95] drop-shadow-sm select-none">
                      {stat.value}
                    </span>
                    <span className="text-xl sm:text-3xl md:text-4xl font-bold text-white">
                      +
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm text-zinc-400 leading-snug mt-1.5 sm:mt-2">
                    {stat.labelTop}
                    <br />
                    {stat.labelBottom}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
