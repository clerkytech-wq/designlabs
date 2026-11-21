"use client";

import React from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import ClientLogos from "./ClientLogos";

interface HeroProps {
  onOpenContact: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full max-w-full overflow-hidden select-none pb-8 sm:pb-12 md:pb-14"
      style={{
        backgroundColor: "#ba3d03",
        backgroundImage:
          "url('/images/hero-gradient.png'), linear-gradient(180deg, #ba3d03 0%, #a73704 45%, #842b04 75%, #631f04 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Subtle Ambient Warm Highlight Glow */}
      <div
        className="absolute top-16 left-1/2 -translate-x-1/2 w-80 h-80 sm:w-[620px] sm:h-[360px] rounded-full bg-[#e8b76b]/10 blur-3xl pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Architectural Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-8 lg:px-12 pt-3 sm:pt-6 md:pt-8">
        
        {/* Giant Full-Width Condensed "AGENCY" Headline Row */}
        <div className="relative w-full flex items-center justify-between">
          {/* Left Crosshair Accent (+) */}
          <span
            className="text-[#e8b76b] font-mono text-sm sm:text-2xl md:text-3xl font-light select-none shrink-0"
            aria-hidden="true"
          >
            +
          </span>

          {/* Monumental Full-Span "AGENCY" Wordmark */}
          <h1 className="font-[family-name:var(--font-anton)] text-[22.5vw] sm:text-[20.5vw] lg:text-[265px] xl:text-[305px] uppercase text-white leading-[0.8] tracking-[0.01em] scale-x-[1.18] origin-center text-center select-none">
            AGENCY
          </h1>

          {/* Right Copyright Badge (©) */}
          <span
            className="text-[#e8b76b] font-sans text-xs sm:text-2xl md:text-3xl font-semibold select-none shrink-0 self-center"
            aria-hidden="true"
          >
            ©
          </span>
        </div>

        {/* Lower Split Stage Overlapping the Base of "AGENCY" (No text beneath the image) */}
        <div className="relative z-20 grid grid-cols-12 gap-2.5 sm:gap-6 md:gap-8 items-end -mt-3 sm:-mt-9 md:-mt-12 lg:-mt-16">
          
          {/* Left Column (Under A-G): Stacked "IDEAS. DESIGN. EXPERIENCES." + Divider + Blurb */}
          <div className="col-span-4 sm:col-span-3 min-w-0 pt-5 sm:pt-12 md:pt-16 pb-1 sm:pb-2">
            <div className="font-[family-name:var(--font-oswald)] font-medium uppercase text-white text-[15px] sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.05] tracking-tight space-y-0.5">
              <p>
                IDEAS<span className="text-[#e8b76b]">.</span>
              </p>
              <p>
                DESIGN<span className="text-[#e8b76b]">.</span>
              </p>
              <p>
                EXPERIENCES<span className="text-[#e8b76b]">.</span>
              </p>
            </div>

            {/* Short Horizontal Accent Rule */}
            <div
              className="w-4 sm:w-7 h-[2px] bg-[#e8b76b] my-2 sm:my-4 md:my-5"
              aria-hidden="true"
            />

            {/* Concise 3-Line Agency Copy */}
            <p className="text-white/85 text-[7.5px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed max-w-[230px]">
              A digital agency crafting bold brands and immersive experiences
              that drive real results.
            </p>
          </div>

          {/* Right Column (Overlapping under G-E-N-C-Y): Team Workspace Image with #e8c580 Offset Rectangular Backdrop */}
          <div className="col-span-8 sm:col-span-9 min-w-0 relative pr-2.5 sm:pr-4 md:pr-5 pb-2.5 sm:pb-4 md:pb-5">
            {/* Solid #e8c580 Offset Rectangular Backdrop matching attached package card style */}
            <div
              className="absolute top-2.5 sm:top-4 md:top-5 left-2.5 sm:left-4 md:left-5 right-0 bottom-0 bg-[#e8c580] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)] pointer-events-none z-0"
              aria-hidden="true"
            />

            <div className="relative z-10 w-full aspect-[16/10] sm:aspect-[16/9.4] overflow-hidden bg-zinc-950 shadow-2xl border-[1.5px] sm:border-2 border-white">
              <Image
                src="/images/hero-team-workspace.jpg"
                alt="DesignLabs creative team collaborating in studio"
                fill
                priority
                unoptimized
                className="object-cover object-[50%_58%]"
              />
              {/* Subtle cinematic contrast vignette */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/15 pointer-events-none" />

              {/* Right-Side Overlapping Brand Card ("STRATEGY / DESIGN / DEVELOPMENT / GROWTH") */}
              <button
                type="button"
                onClick={onOpenContact}
                className="text-left absolute right-2 sm:right-5 md:right-7 bottom-2 sm:bottom-5 md:bottom-7 w-[92px] sm:w-[180px] md:w-[215px] bg-[#ba3d03]/95 hover:bg-[#a73704] backdrop-blur-md border border-[#e8b76b]/35 p-2 sm:p-5 md:p-6 shadow-2xl transition-colors duration-200 cursor-pointer group"
              >
                {/* Top-Right Tiny Crosshair (+) */}
                <span
                  className="absolute top-1.5 right-2 sm:top-2.5 sm:right-3 text-[#e8b76b] font-mono text-[9px] sm:text-xs leading-none"
                  aria-hidden="true"
                >
                  +
                </span>

                {/* Stacked Disciplines List */}
                <ul className="font-[family-name:var(--font-oswald)] font-normal uppercase text-white text-[8.5px] sm:text-sm md:text-[15px] tracking-wider leading-[1.35] space-y-0.5">
                  <li>STRATEGY</li>
                  <li>DESIGN</li>
                  <li>DEVELOPMENT</li>
                  <li>GROWTH</li>
                </ul>
              </button>
            </div>
          </div>

        </div>

        {/* Partnered Brands Strip (Pure white logos, no subtitles) */}
        <ClientLogos />

      </div>
    </section>
  );
}
