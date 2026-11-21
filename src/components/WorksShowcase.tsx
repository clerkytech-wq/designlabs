"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function WorksShowcase({ onOpenQuote }: { onOpenQuote: () => void }) {
  const [filter, setFilter] = useState("All");

  const projects = [
    {
      id: 1,
      title: "Kroma Protocol",
      category: "Brand Identity & WebGL",
      tags: ["Fintech", "Rebranding", "Design System"],
      color: "from-amber-700/20 to-[#3d1203]/40",
      accent: "#e8c580",
      description: "Complete visual identity and 3D web experience for a next-generation decentralized layer-2 network.",
    },
    {
      id: 2,
      title: "Aura Haute Joaillerie",
      category: "Digital Experience & E-Commerce",
      tags: ["Luxury", "E-Commerce", "UI/UX"],
      color: "from-stone-800/30 to-[#3d1203]/50",
      accent: "#e8c580",
      description: "Bespoke digital flagship experience with fluid kinetic interactions for a Paris-based contemporary jewelry house.",
    },
    {
      id: 3,
      title: "Solace Health AI",
      category: "Product Design & Design System",
      tags: ["Healthcare", "SaaS", "Mobile App"],
      color: "from-zinc-800/30 to-[#3d1203]/40",
      accent: "#e8c580",
      description: "Human-centered clinical intelligence platform engineered with enterprise precision and soothing aesthetics.",
    },
    {
      id: 4,
      title: "Verve Kinetic Lab",
      category: "3D Motion & Packaging",
      tags: ["Packaging", "3D Art", "Gen-Z Brand"],
      color: "from-[#3d1203]/30 to-amber-900/50",
      accent: "#e8c580",
      description: "High-octane visual identity, sustainable generative packaging, and TikTok-native 3D brand world.",
    },
  ];

  const categories = ["All", "Brand Identity", "Digital Experience", "3D Motion"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category.includes(filter) || p.tags.includes(filter));

  return (
    <section id="portfolio" className="w-full py-20 bg-[#faf8f5] border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#3d1203]/10 text-xs font-bold uppercase tracking-wider text-[#3d1203] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#e8c580]" />
              Selected Case Studies
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a1a] tracking-tight">
              Showcase of Works
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-xl">
              Category-defining brands crafted with bold aesthetics and enterprise scale.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  filter === cat
                    ? "bg-[#3d1203] text-[#e8c580] shadow-sm"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="group relative bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Mockup Canvas */}
              <div
                className={`relative w-full h-64 sm:h-72 bg-gradient-to-br ${proj.color} p-8 flex flex-col justify-between overflow-hidden`}
              >
                <div className="flex justify-between items-center z-10">
                  <span className="text-xs font-bold tracking-widest text-white/90 uppercase px-3 py-1 rounded-full bg-black/30 backdrop-blur-xs">
                    {proj.category}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/90 text-[#3d1203] flex items-center justify-center transform group-hover:rotate-45 group-hover:bg-[#3d1203] group-hover:text-[#e8c580] transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Stylized Abstract Brand Graphic */}
                <div className="absolute -right-8 -bottom-8 w-60 h-60 rounded-full border-[12px] border-[#e8c580]/20 transform group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                <div className="absolute right-12 bottom-12 w-32 h-32 rounded-full bg-[#3d1203]/20 blur-xl pointer-events-none" />

                <div className="z-10 mt-auto">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-xs">
                    {proj.title}
                  </h3>
                </div>
              </div>

              {/* Description & Tags */}
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#faf7f2] text-[#3d1203] border border-[#e8c580]/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-[#3d1203] text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl font-extrabold text-[#e8c580]">
              Ready to create something iconic?
            </h3>
            <p className="text-sm text-gray-300 mt-1 max-w-lg">
              Partner with designlabs to transform your brand identity, digital products, and market presence.
            </p>
          </div>
          <button
            onClick={onOpenQuote}
            className="flex-shrink-0 px-8 py-3.5 rounded-lg bg-[#e8c580] text-[#3d1203] font-extrabold text-sm hover:bg-[#f5dfb0] transition-colors shadow-lg active:scale-95"
          >
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
