"use client";

import React, { useEffect, useState } from "react";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { label: "Brand Identity & Guidelines", cat: "Service" },
    { label: "Design Systems & UI Kits", cat: "Service" },
    { label: "3D Motion & WebGL", cat: "Specialty" },
    { label: "Fintech Rebranding Case Study", cat: "Work" },
    { label: "Gen-Z Luxury E-Commerce", cat: "Work" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#3d1203]/10 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-gray-100 gap-3">
          <Search className="w-5 h-5 text-[#3d1203]/60" />
          <input
            type="text"
            placeholder="Search agency services, case studies, or design systems..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-base text-[#1a1a1a] placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-[#3d1203] hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="p-6 bg-[#faf8f5]/60">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#3d1203]/70 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#e8c580]" />
            Trending Searches
          </div>
          <div className="space-y-1.5">
            {quickLinks.map((item, idx) => (
              <button
                key={idx}
                onClick={onClose}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm text-[#3d1203] hover:bg-white hover:shadow-sm border border-transparent hover:border-[#e8c580]/30 transition-all group"
              >
                <span className="font-medium">{item.label}</span>
                <span className="flex items-center gap-1.5 text-xs text-gray-400 group-hover:text-[#3d1203]">
                  {item.cat}
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-white border-t border-gray-100 text-xs text-gray-400 flex justify-between items-center">
          <span>Press ESC to exit</span>
          <span className="text-[#3d1203] font-medium">designlabs search</span>
        </div>
      </div>
    </div>
  );
}
