"use client";

import React from "react";
import { X, ArrowRight, CheckCircle2, Calendar, User, Tag } from "lucide-react";
import { ProjectItem } from "./BehindTheDesigns";

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export default function CaseStudyModal({
  project,
  onClose,
  onOpenContact,
}: CaseStudyModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Modal Header Banner - Pure colours and gradient without bitmap images */}
        <div className={`relative w-full h-44 sm:h-60 bg-gradient-to-br ${project.gradient} p-5 sm:p-8 flex flex-col justify-end`}>
          <div className="absolute top-5 left-5 font-mono text-xs tracking-wider uppercase bg-black/40 px-2.5 py-1 rounded-full border border-white/10 text-white/80 backdrop-blur-md">
            {project.tag} • ARCHIVE SPECIMEN
          </div>
          
          <div className="relative z-10">
            <span 
              className="inline-block px-2.5 py-0.5 rounded-full text-white text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-1.5"
              style={{ backgroundColor: project.accent }}
            >
              {project.category}
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
              {project.title}
            </h3>
            <p className="text-zinc-300 text-xs sm:text-sm mt-1">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 text-zinc-300">
          {/* Metadata bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 pb-4 sm:pb-6 border-b border-white/10 text-xs sm:text-sm">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 shrink-0" />
              <div className="truncate">
                <span className="text-zinc-400 block text-[9px] sm:text-[10px] uppercase">Client</span>
                <span className="text-white font-medium truncate block">{project.client}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 shrink-0" />
              <div>
                <span className="text-zinc-400 block text-[9px] sm:text-[10px] uppercase">Year</span>
                <span className="text-white font-medium">{project.year}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500 shrink-0" />
              <div>
                <span className="text-zinc-400 block text-[9px] sm:text-[10px] uppercase">Discipline</span>
                <span className="text-white font-medium">Agency Design</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5 sm:space-y-2">
            <h4 className="text-xs sm:text-sm uppercase tracking-wider text-white font-semibold">
              Project Overview
            </h4>
            <p className="text-xs sm:text-sm md:text-base leading-relaxed text-zinc-400">
              {project.description}
            </p>
          </div>

          {/* Deliverables list */}
          <div className="space-y-2 sm:space-y-3">
            <h4 className="text-xs sm:text-sm uppercase tracking-wider text-white font-semibold">
              Key Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900/80 border border-white/5 text-xs text-zinc-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
            <p className="text-[11px] sm:text-xs text-zinc-400">
              Ready to elevate your agency or brand?
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#ba3d03] hover:bg-[#a73704] text-white font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer shadow-lg shadow-orange-950/40"
            >
              <span>Start a Project With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
