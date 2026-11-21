"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ReadyToBuildCTAProps {
  onOpenContact: () => void;
}

export default function ReadyToBuildCTA({ onOpenContact }: ReadyToBuildCTAProps) {
  return (
    <section
      id="contact-cta"
      className="relative w-full max-w-full overflow-hidden bg-[#080808] text-white py-12 sm:py-16 md:py-24 px-3 sm:px-6 md:px-10 lg:px-14 select-none border-t border-white/10"
    >
      {/* Subtle Ambient Terracotta Glow behind the Visual */}
      <div
        className="absolute top-1/2 right-10 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-[#ba3d03]/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Main 2-Column Grid matching the attached design pixel-for-pixel on Black */}
        <div className="grid grid-cols-12 gap-3 sm:gap-6 md:gap-10 items-center">
          
          {/* Left Column: Tag, Headline, Subtitle, CTA Button, and Bottom Star */}
          <div className="col-span-7 sm:col-span-7 flex flex-col justify-between min-h-[190px] sm:min-h-[290px] md:min-h-[360px] pr-1 sm:pr-4">
            
            <div className="space-y-1.5 sm:space-y-3 md:space-y-4">
              
              {/* Top Tag: "LET'S WORK" */}
              <p className="text-[#e85d1a] text-[8px] sm:text-[10px] md:text-xs font-bold tracking-widest uppercase">
                LET&apos;S WORK
              </p>

              {/* Main Headline: "READY TO BUILD SOMETHING GREAT?" */}
              <h2 className="text-base sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-[#e85d1a] uppercase leading-[1.05]">
                READY TO BUILD<br />
                SOMETHING GREAT?
              </h2>

              {/* Subtitle */}
              <p className="text-zinc-300 text-[7px] sm:text-xs md:text-sm font-medium tracking-wide uppercase max-w-md leading-snug sm:leading-relaxed">
                WE TURN IDEAS INTO BOLD VISUAL IDENTITIES AND DIGITAL EXPERIENCES THAT STAND OUT AND SELL.
              </p>

              {/* CTA Button: "START A PROJECT" */}
              <div className="pt-1.5 sm:pt-4">
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-6 sm:py-3 rounded-full bg-[#ba3d03] hover:bg-[#d94808] text-white text-[9px] sm:text-xs md:text-sm font-bold tracking-wider uppercase transition-all duration-200 shadow-lg shadow-[#ba3d03]/25 hover:shadow-[#ba3d03]/40 active:scale-95 cursor-pointer"
                >
                  <span>START A PROJECT</span>
                  <ArrowUpRight className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                </button>
              </div>

            </div>

            {/* Bottom-Left Brand Star matching mockup */}
            <div className="pt-3 sm:pt-6">
              <svg
                className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 fill-[#e85d1a] text-[#e85d1a]"
                viewBox="0 0 24 24"
                aria-label="Star icon"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>

          </div>

          {/* Right Column: Visual Image Container with Dynamic Red Motion Blur */}
          <div className="col-span-5 sm:col-span-5 relative group">
            <div className="relative aspect-[1/1] w-full max-w-[420px] ml-auto rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10 bg-[#120406]">
              <Image
                src="/images/cta-motion-visual.jpg"
                alt="Creative portrait with motion blur"
                fill
                unoptimized
                priority
                className="object-cover scale-[1.08] transition-transform duration-700 group-hover:scale-[1.12]"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
