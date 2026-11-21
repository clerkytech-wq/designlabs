"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

interface BehindTheDesignsProps {
  onSelectProject?: (project: ProjectItem) => void;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  client: string;
  year: string;
  description: string;
  deliverables: string[];
  gradient: string;
  tag: string;
  accent: string;
}

export const showcaseProjects: ProjectItem[] = [
  {
    id: "brand-identity",
    title: "Aura Editorial & Eyewear",
    subtitle: "High-Fashion Visual Identity & Brand System",
    category: "Visual Identity",
    client: "Aura Luxury Eyewear",
    year: "2026",
    description:
      "A bold, cinematic visual identity crafted with distinctive chromatic terracotta and amber warmth, editorial typography, and modular design guidelines.",
    deliverables: ["Creative Direction", "Visual Identity", "Typography System", "Packaging Design"],
    gradient: "from-[#ba3d03]/40 via-[#842b04]/60 to-[#0a0a0a]",
    tag: "SYS-01",
    accent: "#ba3d03",
  },
  {
    id: "packaging-design",
    title: "Verve Botanical Aperitivo",
    subtitle: "Artisan Beverage Brand & Packaging Architecture",
    category: "Brand Strategy",
    client: "Verve Botanical Beverages",
    year: "2026",
    description:
      "Sensory brand identity and packaging architecture for an artisan botanical aperitivo, built on tactile typography, rich warm palettes, and strategic positioning.",
    deliverables: ["Product Packaging", "Brand Strategy", "Campaign Direction", "Brand Book"],
    gradient: "from-[#e8b76b]/30 via-[#a73704]/50 to-[#0a0a0a]",
    tag: "SYS-02",
    accent: "#e8b76b",
  },
  {
    id: "digital-platform",
    title: "Solace Wellness Hydrotherapy",
    subtitle: "Digital Platform Architecture & Interaction",
    category: "Web Design",
    client: "Solace Retreats Group",
    year: "2026",
    description:
      "A serene, immersive digital presence translating tactile architectural light and spatial elegance into an intuitive digital experience across all platforms.",
    deliverables: ["UI/UX Architecture", "Web Development", "Interaction Design", "Design Systems"],
    gradient: "from-[#631f04]/60 via-[#ba3d03]/30 to-[#0a0a0a]",
    tag: "SYS-03",
    accent: "#c2410c",
  },
];

export default function BehindTheDesigns({ onSelectProject }: BehindTheDesignsProps) {
  const handleCardClick = (project: ProjectItem) => {
    if (onSelectProject) {
      onSelectProject(project);
    }
  };

  return (
    <section id="works" className="w-full max-w-full overflow-hidden bg-[#050505] text-white pt-6 sm:pt-12 md:pt-16 pb-8 sm:pb-20 md:pb-24 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-1 sm:px-6 lg:px-8">
        
        {/* Top Header - Side-by-side preserved on all screens */}
        <div className="grid grid-cols-2 gap-2 sm:gap-6 md:gap-10 items-start mb-4 sm:mb-10 md:mb-12 w-full">
          {/* Left Column: Orange Tag & Bold Title */}
          <div className="space-y-0.5 sm:space-y-2 min-w-0 overflow-hidden pr-1">
            <span className="text-[#ba3d03] text-[7.5px] sm:text-xs md:text-sm font-semibold tracking-wide inline-block">
              Behind the Designs
            </span>
            <h2 className="text-[11px] sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-[1.18] break-words">
              Shaping Experiences That Make Life Simpler
            </h2>
          </div>

          {/* Right Column: Paragraph */}
          <div className="pt-1 sm:pt-4 min-w-0 overflow-hidden pl-1 sm:pl-0">
            <p className="text-zinc-400 text-[7.5px] sm:text-xs md:text-sm lg:text-base leading-snug sm:leading-relaxed break-words">
              We create brands and digital experiences that inspire, connect, build trust, and grow businesses.
            </p>
          </div>
        </div>

        {/* 3 Showcase Cards - Pure colours, typography and layout (NO images whatsoever) */}
        <div className="grid grid-cols-3 gap-1 sm:gap-4 md:gap-6 w-full">
          {showcaseProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => handleCardClick(project)}
              className="group relative cursor-pointer rounded-md sm:rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 hover:border-white/30 transition-all duration-500 shadow-xl min-w-0"
            >
              {/* Card Surface - 4/5 aspect ratio, pure geometric chromatic design without images */}
              <div className={`relative aspect-[4/5] w-full overflow-hidden rounded-md sm:rounded-2xl bg-gradient-to-b ${project.gradient} p-1 sm:p-5 flex flex-col justify-between`}>
                
                {/* Top of Card: Index Tag & Mini Accent Dot */}
                <div className="flex items-center justify-between text-white/70 min-w-0">
                  <span className="font-mono text-[6px] sm:text-[10px] md:text-xs tracking-wider uppercase bg-black/40 px-1 sm:px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm truncate">
                    {project.tag}
                  </span>
                  <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full shrink-0" style={{ backgroundColor: project.accent }} />
                </div>

                {/* Center of Card: Architectural Typographic specimen representing design discipline */}
                <div className="my-auto py-0.5 flex flex-col items-center justify-center text-center opacity-85 group-hover:opacity-100 transition-opacity min-w-0 overflow-hidden">
                  <div className="text-[11px] sm:text-2xl md:text-4xl font-black tracking-tighter text-white/40 group-hover:text-white/80 transition-colors uppercase select-none font-mono">
                    0{idx + 1}
                  </div>
                  <div className="h-0.5 w-2.5 sm:w-8 my-0.5 sm:my-2 rounded-full" style={{ backgroundColor: project.accent }}></div>
                  <div className="text-[6.5px] sm:text-xs md:text-sm font-semibold text-white tracking-tight leading-tight truncate w-full px-0.5">
                    {project.title}
                  </div>
                </div>

                {/* Bottom of Card: Category & View Button */}
                <div className="pt-0.5 sm:pt-1 border-t border-white/10 min-w-0">
                  <div className="flex items-center justify-between gap-0.5 min-w-0">
                    <span className="text-[5.5px] sm:text-[9.5px] md:text-xs text-zinc-300 font-medium truncate">
                      {project.category}
                    </span>
                    <div className="w-2.5 h-2.5 sm:w-6 sm:h-6 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-zinc-950 flex items-center justify-center transition-colors shrink-0">
                      <ArrowUpRight className="w-1.5 h-1.5 sm:w-3.5 sm:h-3.5" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
