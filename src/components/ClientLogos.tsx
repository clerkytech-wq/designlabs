"use client";

import React from "react";
import Image from "next/image";

export default function ClientLogos() {
  return (
    <div className="relative z-20 w-full max-w-full pt-12 sm:pt-16 md:pt-20 pb-2 select-none">
      {/* Section Heading matching IDEAS / DESIGN / EXPERIENCES typography (slightly scaled down) */}
      <p className="text-center font-[family-name:var(--font-oswald)] font-medium uppercase text-white text-[13px] sm:text-xl md:text-2xl lg:text-[30px] leading-[1.05] tracking-tight mb-5 sm:mb-7 md:mb-8">
        Some partnered brands<span className="text-[#e8b76b]">.</span>
      </p>

      <div className="max-w-4xl mx-auto grid grid-cols-4 gap-3 sm:gap-8 md:gap-12 items-center justify-items-center text-white">

        {/* 1. teerex (Pure white extracted wordmark, no subtitle) */}
        <div
          className="relative h-4 sm:h-6 md:h-7 w-14 sm:w-28 md:w-32 opacity-95 hover:opacity-100 transition-opacity"
          aria-label="teerex"
        >
          <Image
            src="/images/logo-teerex-white.png"
            alt="teerex"
            fill
            unoptimized
            priority
            className="object-contain object-center"
          />
        </div>

        {/* 2. kin social (Exact official extracted mark in pure white) */}
        <div
          className="relative h-7 w-7 sm:h-11 sm:w-11 md:h-12 md:w-12 opacity-95 hover:opacity-100 transition-opacity"
          aria-label="kin social"
        >
          <Image
            src="/images/logo-kinsocial-white.png"
            alt="kin social"
            fill
            unoptimized
            priority
            className="object-contain object-center"
          />
        </div>

        {/* 3. Aquapharm (Pure white mark + wordmark, no motto) */}
        <div
          className="relative h-8 w-11 sm:h-12 sm:w-16 md:h-14 md:w-20 opacity-95 hover:opacity-100 transition-opacity"
          aria-label="Aquapharm"
        >
          <Image
            src="/images/logo-aquapharm-white.png"
            alt="Aquapharm"
            fill
            unoptimized
            priority
            loading="eager"
            className="object-contain object-center"
          />
        </div>

        {/* 4. Lapam Zorkor Hotel (Pure white emblem + wordmark, no motto) */}
        <div
          className="relative h-6 w-14 sm:h-10 sm:w-24 md:h-11 md:w-28 opacity-95 hover:opacity-100 transition-opacity"
          aria-label="Lapam Zorkor Hotel"
        >
          <Image
            src="/images/logo-lapam-white.png"
            alt="Lapam Zorkor Hotel"
            fill
            unoptimized
            priority
            loading="eager"
            className="object-contain object-center"
          />
        </div>

      </div>
    </div>
  );
}
