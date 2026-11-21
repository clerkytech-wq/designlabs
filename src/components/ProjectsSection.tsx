"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ProjectsSectionProps {
  onOpenContact: (projectName?: string) => void;
}

interface ProjectCardItem {
  id: string;
  title: string;
  subtitle: string;
  topStamp: string;
  bottomBadge: string;
  tapeClass: string;
  stampClass: string;
  bottomBadgeClass: string;
  iconBgClass: string;
  thumbnail?: string;
  imageFitClass?: string;
  imagePositionClass?: string;
  bottomBadgePosClass?: string;
  href?: string;
  isUiShowcase?: boolean;
}

const projectsList: ProjectCardItem[] = [
  {
    id: "kin-social",
    title: "Kin Social",
    subtitle: "Diaspora Community Platform • kinsocial-gh.vercel.app",
    topStamp: "LIVE • VERCEL FLAGSHIP",
    bottomBadge: "★ SOCIAL PLATFORM ★",
    tapeClass: "-top-3.5 left-6 sm:left-8 -rotate-2 bg-[#E9E18B]/85 border-black/15",
    stampClass: "bg-black/85 text-white",
    bottomBadgeClass: "bg-[#EFE8DD] text-black border border-black",
    iconBgClass: "bg-emerald-100 text-emerald-700",
    thumbnail: "/images/project-kinsocial.jpg",
    href: "https://kinsocial-gh.vercel.app/",
  },
  {
    id: "teerex",
    title: "Teerex",
    subtitle: "UI Product Design • stitch.google.com",
    topStamp: "UI/UX • STITCH PROTOTYPE",
    bottomBadge: "★ PRODUCT DESIGN ★",
    tapeClass: "-top-3.5 right-6 sm:right-8 rotate-2 bg-[#A8DADC]/85 border-black/20",
    stampClass: "bg-[#facc15] text-black border border-black",
    bottomBadgeClass: "bg-black/90 text-[#facc15] border border-[#facc15]/40",
    iconBgClass: "bg-yellow-100 text-amber-800",
    thumbnail: "/images/project-teerex.jpg",
    imagePositionClass: "object-center",
    href: "https://stitch.google.com/projects/15237043203385571593",
  },
  {
    id: "lapam-zorkor-hotel",
    title: "Lapam Zorkor Hotel",
    subtitle: "Hospitality Web Flagship • lapam-zorkor-hotel-website.vercel.app",
    topStamp: "LIVE • VERCEL FLAGSHIP",
    bottomBadge: "★ HOSPITALITY FLAGSHIP ★",
    tapeClass: "-top-3.5 left-6 sm:left-8 -rotate-2 bg-[#E9E18B]/85 border-black/15",
    stampClass: "bg-black/85 text-[#e8c580] border border-[#e8c580]/30",
    bottomBadgeClass: "bg-[#e8c580] text-black border border-black",
    iconBgClass: "bg-amber-100 text-amber-800",
    thumbnail: "/images/project-lapam-zorkor.jpg",
    imagePositionClass: "object-top",
    href: "https://lapam-zorkor-hotel-website.vercel.app/",
  },
  {
    id: "lapam-zorkor-brochure",
    title: "Lapam Zorkor Hotel Brochure",
    subtitle: "Editorial Brand Brochure • 33-Page PDF Publication",
    topStamp: "PDF • BRAND BROCHURE",
    bottomBadge: "★ OPEN PDF BROCHURE ★",
    tapeClass: "-top-3.5 right-6 sm:right-8 rotate-2 bg-[#A8DADC]/85 border-black/20",
    stampClass: "bg-[#f4cb80] text-black border border-black",
    bottomBadgeClass: "bg-black/90 text-[#f4cb80] border border-[#f4cb80]/40",
    bottomBadgePosClass: "bottom-3 right-3",
    iconBgClass: "bg-amber-100 text-amber-800",
    thumbnail: "/images/project-lapam-brochure.jpg",
    imageFitClass: "object-contain bg-black",
    imagePositionClass: "object-center",
    href: "/docs/lapam-zorkor-hotel-brochure.pdf",
  },
  {
    id: "lapam-zorkor-pizza-menu",
    title: "Lapam Zorkor Pizza Menu",
    subtitle: "Hospitality Menu Design • 6-Page PDF Menu",
    topStamp: "PDF • MENU DESIGN",
    bottomBadge: "★ OPEN PDF MENU ★",
    tapeClass: "-top-3.5 left-6 sm:left-8 -rotate-2 bg-[#E9E18B]/85 border-black/15",
    stampClass: "bg-[#3b1507] text-[#fce9d8]",
    bottomBadgeClass: "bg-[#fce9d8] text-[#3b1507] border border-[#3b1507]",
    iconBgClass: "bg-orange-100 text-[#842b04]",
    thumbnail: "/images/project-pizza-menu.jpg",
    imageFitClass: "object-contain bg-[#fce9d8]",
    imagePositionClass: "object-center",
    href: "/docs/lapam-zorkor-pizza-menu.pdf",
  },
  {
    id: "designlabs-identity",
    title: "DesignLabs Identity System",
    subtitle: "Brand Architecture • Geometric Logomark & System",
    topStamp: "SIGNATURE BRANDING",
    bottomBadge: "★ CHOSEN VISUAL SYSTEM ★",
    tapeClass: "-top-3.5 right-6 sm:right-8 rotate-2 bg-[#A8DADC]/85 border-black/20",
    stampClass: "bg-[#ba3d03]/95 text-white",
    bottomBadgeClass: "bg-black/90 text-white border border-white/20",
    iconBgClass: "bg-amber-100 text-[#ba3d03]",
    thumbnail: "/images/portfolio-item-1.jpg",
  },
  {
    id: "studio-production-hub",
    title: "Studio Production Hub",
    subtitle: "Creative Direction • Editorial Shoot & Workspace",
    topStamp: "ART DIRECTION • SET 03",
    bottomBadge: "★ BEHIND THE SCENES ★",
    tapeClass: "-top-3.5 left-6 sm:left-8 -rotate-2 bg-[#E9E18B]/85 border-black/15",
    stampClass: "bg-black/85 text-white",
    bottomBadgeClass: "bg-[#EFE8DD] text-black border border-black",
    iconBgClass: "bg-zinc-100 text-zinc-900",
    thumbnail: "/images/hero-studio.jpg",
    imagePositionClass: "object-[50%_55%]",
  },
  {
    id: "brand-metrics-dashboard",
    title: "Brand Metrics Dashboard",
    subtitle: "UI/UX Engineering • Live Campaign Telemetry",
    topStamp: "INTERFACE CRAFT",
    bottomBadge: "★ PRODUCT TELEMETRY ★",
    tapeClass: "-top-3.5 right-6 sm:right-8 rotate-2 bg-[#A8DADC]/85 border-black/20",
    stampClass: "bg-[#ba3d03]/95 text-white",
    bottomBadgeClass: "bg-black/90 text-white border border-white/20",
    iconBgClass: "bg-orange-100 text-[#ba3d03]",
    isUiShowcase: true,
  },
];

export default function ProjectsSection({ onOpenContact }: ProjectsSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    didDrag: false,
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || e.button !== 0) return;
    dragStateRef.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      didDrag: false,
    };
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    const state = dragStateRef.current;
    if (!el || !state.active) return;

    const deltaX = e.clientX - state.startX;
    if (Math.abs(deltaX) > 6) {
      state.didDrag = true;
    }
    if (state.didDrag) {
      el.scrollLeft = state.scrollLeft - deltaX;
    }
  };

  const handleMouseEnd = () => {
    if (!dragStateRef.current.active) return;
    dragStateRef.current.active = false;
    setIsDragging(false);
  };

  return (
    <section
      id="works"
      className="relative w-full max-w-full overflow-hidden bg-white text-zinc-950 py-14 sm:py-20 md:py-24 select-none"
    >
      {/* Top Header Split */}
      <div className="max-w-6xl mx-auto w-full px-3 sm:px-6 md:px-10 lg:px-14 mb-6 sm:mb-10 md:mb-12">
        <div className="grid grid-cols-12 gap-3 sm:gap-8 md:gap-12 items-start">
          
          {/* Left Column: Eyebrow + Title */}
          <div className="col-span-6 min-w-0 space-y-1 sm:space-y-2">
            <p className="text-zinc-500 text-[8.5px] sm:text-xs font-semibold tracking-widest uppercase">
              OUR PROJECTS
            </p>
            <h2 className="text-[18px] sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-zinc-950 leading-[1.12]">
              Discover Our
              <br />
              <span className="text-[#ba3d03]">Selected</span> Projects
            </h2>
          </div>

          {/* Right Column: Concise Summary + Discover More */}
          <div className="col-span-6 min-w-0 space-y-2 sm:space-y-4">
            <p className="text-zinc-500 text-[7.5px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed max-w-md ml-auto">
              We craft digital products and brand identities to help clients
              increase visibility and reach their target audience effectively.
              Some of the results we have achieved include:
            </p>
            <div className="max-w-md ml-auto">
              <button
                type="button"
                onClick={() => onOpenContact("Selected Projects Inquiry")}
                className="inline-flex items-center gap-1 text-[#ba3d03] hover:text-[#842b04] text-[8.5px] sm:text-xs md:text-sm font-semibold tracking-tight transition-colors cursor-pointer group"
              >
                <span>Discover More</span>
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Horizontal Scrollable Polaroid Frame Gallery (Large Frames matching attachment, zero scrollbars/buttons) */}
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseEnd}
        onMouseLeave={handleMouseEnd}
        className={`w-full flex gap-6 sm:gap-8 md:gap-10 overflow-x-auto pt-6 pb-10 px-3 sm:px-6 md:px-10 lg:px-[max(3.5rem,calc((100vw-72rem)/2+3.5rem))] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
          isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"
        }`}
      >
        {projectsList.map((project, idx) => {
          const isEven = idx % 2 === 1;
          const cardContent = (
            <div className="relative group">
              {/* Angled Translucent Masking Tape matching attachment */}
              <div
                className={`absolute w-20 sm:w-24 h-6 sm:h-7 border z-30 shadow-xs pointer-events-none backdrop-blur-[1px] ${project.tapeClass}`}
                aria-hidden="true"
              />

              {/* Polaroid Frame Card with crisp 2px black border & gallery mat */}
              <div
                className={`bg-white p-3 sm:p-4 md:p-5 border-2 border-black shadow-2xl transition-transform duration-500 group-hover:-translate-y-1 ${
                  isEven ? "group-hover:rotate-[0.5deg]" : "group-hover:rotate-[-0.5deg]"
                }`}
              >
                {/* Inner Project Thumbnail Stage */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-950">
                  {project.isUiShowcase ? (
                    <div className="absolute inset-0 p-4 sm:p-8 bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb] flex flex-col justify-between">
                      <div className="bg-white rounded-xl p-4 sm:p-7 shadow-sm border border-zinc-200/80 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#ba3d03]" />
                            <span className="text-xs sm:text-base font-bold text-zinc-900">
                              DesignLabs Metrics
                            </span>
                          </div>
                          <span className="text-[10px] sm:text-xs font-mono text-zinc-400">
                            LIVE KPI
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 sm:gap-5">
                          <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-3 sm:p-4">
                            <p className="text-[9px] sm:text-xs text-zinc-400">Reach</p>
                            <p className="text-sm sm:text-2xl font-extrabold text-zinc-900 mt-0.5">
                              4.2M
                            </p>
                          </div>
                          <div className="rounded-xl bg-[#ba3d03]/10 border border-[#ba3d03]/20 p-3 sm:p-4">
                            <p className="text-[9px] sm:text-xs text-[#ba3d03]">Lift</p>
                            <p className="text-sm sm:text-2xl font-extrabold text-[#ba3d03] mt-0.5">
                              +184%
                            </p>
                          </div>
                          <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-3 sm:p-4">
                            <p className="text-[9px] sm:text-xs text-zinc-400">NPS</p>
                            <p className="text-sm sm:text-2xl font-extrabold text-zinc-900 mt-0.5">
                              96
                            </p>
                          </div>
                        </div>
                        <div className="flex items-end gap-2 sm:gap-3 h-14 sm:h-24 pt-2">
                          {[35, 55, 45, 70, 62, 88, 95].map((h, i) => (
                            <div
                              key={i}
                              className={`flex-1 rounded-t-md ${
                                i >= 5 ? "bg-[#ba3d03]" : "bg-zinc-200"
                              }`}
                              style={{ height: `${h}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={project.thumbnail || "/images/portfolio-item-1.jpg"}
                      alt={project.title}
                      fill
                      unoptimized
                      loading="eager"
                      draggable={false}
                      priority={
                        project.id === "kin-social" ||
                        project.id === "teerex" ||
                        project.id === "lapam-zorkor-hotel" ||
                        project.id === "lapam-zorkor-brochure"
                      }
                      className={`transition-transform duration-500 group-hover:scale-105 ${
                        project.imageFitClass || "object-cover"
                      } ${project.imagePositionClass || "object-top"}`}
                    />
                  )}

                  {/* Top-Right Monospace Stamp Tag matching attachment */}
                  <div
                    className={`hidden sm:block absolute top-3 right-3 backdrop-blur-xs text-[9px] sm:text-[11px] font-mono font-bold px-2.5 py-1 uppercase tracking-wider shadow-xs z-10 ${project.stampClass}`}
                  >
                    {project.topStamp}
                  </div>

                  {/* Sticker Badge matching attachment */}
                  <div
                    className={`hidden sm:block absolute text-[8.5px] sm:text-[10px] font-mono font-extrabold px-2.5 py-1 uppercase tracking-wider shadow-xs z-10 ${
                      project.bottomBadgePosClass || "bottom-3 left-3"
                    } ${project.bottomBadgeClass}`}
                  >
                    {project.bottomBadge}
                  </div>
                </div>

                {/* Polaroid Caption Footer inside white frame */}
                <div className="pt-3.5 sm:pt-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-lg md:text-xl text-black tracking-tight group-hover:text-[#ba3d03] transition-colors truncate">
                      {project.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 font-mono mt-0.5 truncate">
                      {project.subtitle}
                    </p>
                  </div>

                  <span
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${project.iconBgClass}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          );

          if (project.href) {
            return (
              <a
                key={project.id}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                onClick={(e) => {
                  if (dragStateRef.current.didDrag) {
                    e.preventDefault();
                    dragStateRef.current.didDrag = false;
                  }
                }}
                className="w-[84%] sm:w-[70%] md:w-[62%] lg:w-[56%] shrink-0 snap-start cursor-pointer block"
              >
                {cardContent}
              </a>
            );
          }

          return (
            <button
              type="button"
              key={project.id}
              onClick={() => {
                if (dragStateRef.current.didDrag) {
                  dragStateRef.current.didDrag = false;
                  return;
                }
                onOpenContact(project.title);
              }}
              className="text-left w-[84%] sm:w-[70%] md:w-[62%] lg:w-[56%] shrink-0 snap-start cursor-pointer"
            >
              {cardContent}
            </button>
          );
        })}
      </div>
    </section>
  );
}
