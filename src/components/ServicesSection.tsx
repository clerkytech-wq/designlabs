"use client";

import React from "react";
import Image from "next/image";

interface ServicesSectionProps {
  onOpenContact: (serviceName?: string) => void;
}

interface ServiceBand {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  bandBgClass: string;
  titleColorClass: string;
  copyColorClass: string;
  listColorClass: string;
  visualType: "strategy" | "identity" | "website" | "product" | "campaign" | "photography";
}

const serviceBands: ServiceBand[] = [
  {
    id: "brand-strategy",
    title: "Brand Strategy",
    description:
      "It's the core of your company's identity. It guides all business decisions, ensuring a consistent and impactful presence in the market.",
    deliverables: [
      "Research & Insights",
      "Unique Ways",
      "Purpose, Mission, Vision",
      "Value Proposition",
      "Personality Traits",
      "Verbal Identity",
      "Naming",
    ],
    bandBgClass: "bg-[#ba3d03]",
    titleColorClass: "text-white",
    copyColorClass: "text-white/90",
    listColorClass: "text-white/95",
    visualType: "strategy",
  },
  {
    id: "visual-identity",
    title: "Visual Identity",
    description:
      "Visual identity is the unique visual language of your brand, creating memorable impressions and emotional connections with your audience.",
    deliverables: [
      "Logotype, Typography & Colour",
      "Illustrations & 3D",
      "Photography Art Direction",
      "Brand Book & Guidelines",
      "Animations",
      "Video Production",
      "Product Design",
    ],
    bandBgClass: "bg-white",
    titleColorClass: "text-[#111111]",
    copyColorClass: "text-zinc-700",
    listColorClass: "text-zinc-900",
    visualType: "identity",
  },
  {
    id: "website",
    title: "Website",
    description:
      "Our website design services blend innovation and creativity to deliver user-centric solutions that elevate your brand and engage your audience.",
    deliverables: [
      "UX Design",
      "User Testing",
      "Product Prototype",
      "Mobile UI",
      "Software UI Design",
      "Web App Design",
      "Interaction Design",
    ],
    bandBgClass: "bg-[#e8c580]",
    titleColorClass: "text-[#111111]",
    copyColorClass: "text-zinc-900/90",
    listColorClass: "text-zinc-950",
    visualType: "website",
  },
  {
    id: "product",
    title: "Product",
    description:
      "Our product design services focus on creating intuitive and aesthetically pleasing products that resonate with your audience and stand out in the market.",
    deliverables: [
      "UX Design",
      "User Testing",
      "Product Prototype",
      "Mobile UI",
      "Software UI Design",
      "Web App Design",
      "Interaction Design",
    ],
    bandBgClass: "bg-[#0d0d0d]",
    titleColorClass: "text-white",
    copyColorClass: "text-zinc-300",
    listColorClass: "text-zinc-200",
    visualType: "product",
  },
  {
    id: "digital-visual-campaign-ads",
    title: "Digital/Visual Campaign & Ads",
    description:
      "We conceptualize and produce high-converting visual campaigns and paid media creatives built to capture attention and accelerate growth.",
    deliverables: [
      "Campaign Art Direction",
      "Social Media Ad Suites",
      "Motion & Video Ads",
      "Paid Search & Display Creative",
      "Product Launch Visuals",
      "Out-of-Home & Billboard",
      "Conversion A/B Creative",
    ],
    bandBgClass: "bg-white",
    titleColorClass: "text-[#111111]",
    copyColorClass: "text-zinc-700",
    listColorClass: "text-zinc-900",
    visualType: "campaign",
  },
  {
    id: "photography-creative-shoots",
    title: "Photography & Creative Shoots",
    description:
      "End-to-end creative production delivering editorial photography, lookbooks, and studio shoots tailored to elevate your brand's visual story.",
    deliverables: [
      "Editorial & Fashion Shoots",
      "Studio Product Photography",
      "Campaign Set Design",
      "Creative Direction",
      "Location Scouting & Casting",
      "Color Grading & Retouching",
      "Behind-the-Scenes Reels",
    ],
    bandBgClass: "bg-[#ba3d03]",
    titleColorClass: "text-white",
    copyColorClass: "text-white/90",
    listColorClass: "text-white/95",
    visualType: "photography",
  },
];

function ServiceBandVisual({ type, title }: { type: ServiceBand["visualType"]; title: string }) {
  if (type === "campaign") {
    return <CampaignAdVisual title={title} />;
  }

  if (type === "photography") {
    return <PhotographyShootVisual title={title} />;
  }

  if (type === "strategy") {
    return (
      <div className="relative w-full aspect-[1.42/1] rounded-md sm:rounded-lg overflow-hidden bg-[#1a0a02] border border-white/15 shadow-xl">
        <Image
          src="/images/services-designlabs.jpg"
          alt={`${title} — DesignLabs brand showcase`}
          fill
          unoptimized
          loading="eager"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15 pointer-events-none" />
        <div className="absolute top-3 left-3.5 sm:top-4 sm:left-5 text-white/95 font-medium text-xs sm:text-sm md:text-base leading-tight drop-shadow-sm">
          We build bold
          <br />
          brand foundations
        </div>
        <div className="absolute bottom-3 right-3.5 sm:bottom-4 sm:right-5 text-right text-[9px] sm:text-[10px] text-white/80 leading-snug max-w-[140px]">
          Strategy engineered to make every touchpoint iconic.
        </div>
      </div>
    );
  }

  if (type === "identity") {
    return (
      <div className="relative w-full aspect-[1.42/1] rounded-md sm:rounded-lg overflow-hidden bg-[#f5f3ef] border border-zinc-200 p-2 sm:p-2.5 shadow-xl grid grid-cols-12 grid-rows-6 gap-1.5 sm:gap-2">
        {/* Top-Left Hero DesignLabs Tile */}
        <div className="col-span-6 row-span-3 relative rounded overflow-hidden bg-[#ba3d03]">
          <Image
            src="/images/services-designlabs.jpg"
            alt={`${title} — DesignLabs identity system`}
            fill
            unoptimized
            loading="eager"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Top-Center DesignLabs Palette Swatches */}
        <div className="col-span-3 row-span-3 flex flex-col justify-between gap-1">
          <div className="flex-1 rounded-sm bg-[#0d0d0d]" />
          <div className="flex-1 rounded-sm bg-[#ba3d03]" />
          <div className="flex-1 rounded-sm bg-[#e8c580]" />
          <div className="flex-1 rounded-sm bg-[#fce9d8] border border-zinc-200" />
        </div>

        {/* Top-Right Micro Brand Direction Card */}
        <div className="col-span-3 row-span-3 rounded bg-[#1d0c04] p-1.5 sm:p-2 flex flex-col justify-between text-white">
          <span className="text-[7px] sm:text-[8px] font-bold text-[#e8c580] leading-tight">
            Crafted
            <br />
            to stand
            <br />
            apart
          </span>
          <div className="grid grid-cols-2 gap-1">
            <span className="h-2.5 rounded-xs bg-[#ba3d03]" />
            <span className="h-2.5 rounded-xs bg-[#e8c580]" />
          </div>
        </div>

        {/* Bottom-Left Two Stacked Brand Badges */}
        <div className="col-span-4 row-span-3 flex flex-col gap-1.5">
          <div className="flex-1 rounded bg-[#140a05] px-2 flex items-center justify-between">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e8c580]" />
            <span className="text-[7px] sm:text-[8px] font-mono font-bold text-white tracking-wider">
              SYSTEM
            </span>
          </div>
          <div className="flex-1 rounded bg-[#e8c580] px-2 flex items-center justify-center">
            <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-widest text-[#111111]">
              BRAND LABS
            </span>
          </div>
        </div>

        {/* Bottom-Center Typography Specimen ("Aa") */}
        <div className="col-span-5 row-span-3 rounded bg-[#0e0b0a] p-2 flex items-center justify-center relative overflow-hidden">
          <span className="text-2xl sm:text-4xl font-black tracking-tighter text-white/90 select-none">
            Aa
          </span>
          <span className="absolute bottom-1 right-1.5 text-[6px] sm:text-[7px] font-mono text-[#e8c580] uppercase">
            Type Grid
          </span>
        </div>

        {/* Bottom-Right Miniature Device Card */}
        <div className="col-span-3 row-span-3 rounded bg-zinc-200 p-1.5 flex items-center justify-center">
          <div className="relative w-full h-full rounded-xs overflow-hidden bg-gradient-to-b from-[#ba3d03] via-[#9b3103] to-[#571902] border border-black/15 p-1">
            <Image
              src="/images/services-designlabs.jpg"
              alt="DesignLabs visual application"
              fill
              unoptimized
              loading="eager"
              className="object-contain object-center px-1"
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === "website") {
    return (
      <div className="relative w-full aspect-[1.42/1] rounded-md sm:rounded-lg overflow-hidden bg-[#121212] p-3 sm:p-5 flex flex-col items-center justify-center shadow-xl">
        {/* Laptop Lid / Display */}
        <div className="relative w-[84%] aspect-[16/10] rounded-t-lg border-[3px] sm:border-4 border-zinc-800 bg-[#ba3d03] overflow-hidden shadow-2xl">
          <Image
            src="/images/services-designlabs.jpg"
            alt={`${title} — DesignLabs digital platform showcase`}
            fill
            unoptimized
            loading="eager"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {/* Subtle Website Header Strip */}
          <div className="absolute top-1.5 left-2.5 right-2.5 flex items-center justify-between text-[6px] sm:text-[7px] font-mono text-white/80">
            <span>DESIGNLABS.GH</span>
            <span>WORK • SERVICES • CONTACT</span>
          </div>
          <div className="absolute bottom-2 left-2.5 text-[8px] sm:text-[10px] font-medium text-white/95 leading-tight drop-shadow-sm">
            Digital Craft
            <br />
            Built to Perform.
          </div>
        </div>
        {/* Laptop Base Lip */}
        <div className="w-[94%] h-2 sm:h-2.5 rounded-b-md bg-gradient-to-b from-zinc-600 to-zinc-800 flex items-start justify-center shadow-md">
          <span className="w-8 sm:w-12 h-0.5 sm:h-1 rounded-b bg-zinc-900/80" />
        </div>
      </div>
    );
  }

  // "product"
  return (
    <div className="relative w-full aspect-[1.42/1] rounded-md sm:rounded-lg overflow-hidden bg-[#faf6f0] p-3 sm:p-4 flex items-center justify-center gap-2 sm:gap-3 shadow-xl">
      {/* Left Floating Metric Chip */}
      <div className="hidden sm:flex flex-col gap-0.5 bg-white rounded-md border border-zinc-200/90 shadow-md px-2.5 py-2 z-10 shrink-0">
        <span className="text-[7px] font-mono uppercase text-zinc-400">Growth</span>
        <span className="text-xs font-extrabold text-[#ba3d03]">+184%</span>
      </div>

      {/* Center Smartphone Mockup */}
      <div className="relative h-[88%] aspect-[9/18.5] rounded-2xl border-[3px] border-zinc-900 bg-gradient-to-b from-[#ba3d03] via-[#9b3103] to-[#571902] overflow-hidden shadow-2xl z-20 flex flex-col shrink-0">
        {/* Dynamic Island Notch */}
        <div className="w-8 h-1.5 rounded-full bg-zinc-950 mx-auto mt-1.5 z-10 shrink-0" />
        <div className="relative flex-1 mx-1.5 my-1 rounded-lg overflow-hidden bg-gradient-to-b from-[#ba3d03] via-[#9b3103] to-[#571902]">
          <Image
            src="/images/services-designlabs.jpg"
            alt={`${title} — DesignLabs mobile product experience`}
            fill
            unoptimized
            loading="eager"
            className="object-contain object-center px-1 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="bg-white/95 px-2 py-1.5 flex items-center justify-between shrink-0">
          <span className="text-[6.5px] sm:text-[7.5px] font-bold text-zinc-900">
            DesignLabs UI
          </span>
          <span className="w-2 h-2 rounded-full bg-[#ba3d03]" />
        </div>
      </div>

      {/* Right Floating UI Chip */}
      <div className="hidden sm:flex flex-col gap-0.5 bg-[#140a05] text-white rounded-md border border-black/20 shadow-md px-2.5 py-2 z-10 shrink-0">
        <span className="text-[7px] font-mono uppercase text-[#e8c580]">System</span>
        <span className="text-[10px] font-bold">v4.0 Live</span>
      </div>
    </div>
  );
}

function CampaignAdVisual({ title }: { title: string }) {
  return (
    <div className="relative w-full aspect-[1.42/1] rounded-md sm:rounded-lg overflow-hidden bg-[#f5efe8] border border-zinc-200 p-2 sm:p-2.5 shadow-xl grid grid-cols-12 grid-rows-6 gap-1.5 sm:gap-2">
      {/* Main Hero Paid Media Ad Canvas */}
      <div className="col-span-8 row-span-6 relative rounded overflow-hidden bg-gradient-to-br from-[#ba3d03] via-[#9e3303] to-[#5a1a03]">
        <Image
          src="/images/services-designlabs.jpg"
          alt={`${title} — DesignLabs campaign key visual`}
          fill
          unoptimized
          loading="eager"
          className="object-contain object-center px-2 transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 pointer-events-none" />
        <div className="absolute top-2 left-2.5 bg-black/80 text-[#e8c580] text-[6.5px] sm:text-[7.5px] font-mono font-bold px-1.5 py-0.5 uppercase tracking-wider rounded-xs">
          CAMPAIGN LAUNCH
        </div>
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-end justify-between text-white">
          <span className="text-[8px] sm:text-[10px] font-bold leading-tight">
            High-Impact Ad Suite
          </span>
          <span className="bg-[#e8c580] text-[#111111] text-[6.5px] sm:text-[7.5px] font-extrabold px-1.5 py-0.5 rounded-xs uppercase">
            Learn More
          </span>
        </div>
      </div>

      {/* Top-Right Ad Performance Metric Card */}
      <div className="col-span-4 row-span-3 rounded bg-[#140a05] p-2 flex flex-col justify-between text-white">
        <span className="text-[6.5px] sm:text-[7.5px] font-mono uppercase text-[#e8c580]">
          Paid Reach
        </span>
        <div>
          <p className="text-sm sm:text-lg font-extrabold leading-none text-white">
            4.2M+
          </p>
          <p className="text-[6.5px] sm:text-[7px] text-zinc-400 mt-0.5">
            Meta • TikTok • OOH
          </p>
        </div>
      </div>

      {/* Bottom-Right Vertical Ad Story Tile */}
      <div className="col-span-4 row-span-3 rounded bg-[#e8c580] p-2 flex flex-col justify-between text-[#111111]">
        <span className="text-[6.5px] sm:text-[7px] font-mono font-bold uppercase tracking-wider">
          9:16 Story Ad
        </span>
        <div className="space-y-1">
          <div className="w-full h-1.5 rounded-full bg-[#111111]/20 overflow-hidden">
            <div className="w-4/5 h-full bg-[#ba3d03]" />
          </div>
          <p className="text-[7px] sm:text-[8px] font-bold leading-tight">
            CTR +62% Lift
          </p>
        </div>
      </div>
    </div>
  );
}

function PhotographyShootVisual({ title }: { title: string }) {
  return (
    <div className="relative w-full aspect-[1.42/1] rounded-md sm:rounded-lg overflow-hidden bg-[#120905] border border-white/15 shadow-xl p-2 sm:p-2.5">
      <div className="relative w-full h-full rounded overflow-hidden bg-zinc-950">
        <Image
          src="/images/hero-studio.jpg"
          alt={`${title} — DesignLabs studio production`}
          fill
          unoptimized
          loading="eager"
          className="object-cover object-[50%_52%] transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />

        {/* Viewfinder Corner Framing Accents */}
        <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-[#e8c580]" aria-hidden="true" />
        <span className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-[#e8c580]" aria-hidden="true" />
        <span className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-[#e8c580]" aria-hidden="true" />
        <span className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-[#e8c580]" aria-hidden="true" />

        {/* Top Viewfinder Metadata */}
        <div className="absolute top-3 left-5 right-5 flex items-center justify-between text-[7px] sm:text-[8px] font-mono text-white/90">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ba3d03]" />
            REC • SET 01
          </span>
          <span className="text-[#e8c580]">50MM • F/1.8</span>
        </div>

        {/* Bottom-Right Miniature DesignLabs Brand Watermark Card */}
        <div className="absolute bottom-3 right-4 w-20 sm:w-24 aspect-[16/10] rounded overflow-hidden border border-[#e8c580]/50 shadow-lg">
          <Image
            src="/images/services-designlabs.jpg"
            alt="DesignLabs Studio Production"
            fill
            unoptimized
            loading="eager"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute bottom-3 left-5 text-white">
          <p className="text-[7px] sm:text-[8px] font-mono uppercase tracking-wider text-[#e8c580]">
            Art Direction
          </p>
          <p className="text-[9px] sm:text-xs font-bold leading-tight">
            Editorial Studio Set
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection({ onOpenContact }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="relative w-full max-w-full overflow-hidden flex flex-col select-none"
      aria-label="DesignLabs Services"
    >
      {/* Top Services Section Label Strip */}
      <div className="w-full bg-[#ba3d03] pt-8 pb-2 sm:pt-11 sm:pb-3 md:pt-12 md:pb-2 px-4 text-center">
        <h2 className="font-[family-name:var(--font-anton)] text-4xl sm:text-5xl md:text-6xl lg:text-[68px] uppercase tracking-[0.02em] text-white leading-none">
          SERVICES
        </h2>
      </div>

      {serviceBands.map((service) => (
        <div key={service.id} className={`w-full ${service.bandBgClass}`}>
          <button
            type="button"
            onClick={() => onOpenContact(service.title)}
            className="w-full text-left block cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/60"
          >
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-12 lg:px-14 py-10 sm:py-14 md:py-16">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-7 sm:gap-8 md:gap-10 items-stretch">
                {/* Left Side: Giant Title Top + 2-Col Description & Deliverables Bottom */}
                <div className="md:col-span-7 flex flex-col justify-between min-w-0">
                  <h3
                    className={`text-3xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[68px] font-semibold tracking-[-0.03em] leading-[1.02] ${service.titleColorClass}`}
                  >
                    {service.title}
                  </h3>

                  <div className="mt-8 sm:mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-start">
                    {/* Paragraph */}
                    <p
                      className={`sm:col-span-6 text-xs sm:text-[13px] md:text-[14px] leading-[1.45] max-w-[300px] ${service.copyColorClass}`}
                    >
                      {service.description}
                    </p>

                    {/* Deliverables Stack */}
                    <ul
                      className={`sm:col-span-6 text-[11px] sm:text-xs md:text-[13px] leading-[1.48] font-medium space-y-0.5 ${service.listColorClass}`}
                    >
                      {service.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Side: Rectangular Showcase Visual */}
                <div className="md:col-span-5 flex items-center justify-end min-w-0">
                  <ServiceBandVisual type={service.visualType} title={service.title} />
                </div>
              </div>
            </div>
          </button>
        </div>
      ))}
    </section>
  );
}
