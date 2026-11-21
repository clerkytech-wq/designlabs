"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("");

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#works" },
    { label: "Reviews", href: "#reviews" },
  ];

  return (
    <nav className="relative z-30 w-full pt-3 sm:pt-6 md:pt-7 pb-2">
      <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12 grid grid-cols-12 items-center gap-y-2.5 gap-x-2 sm:gap-4">

        {/* Left: Enlarged DesignLabs Logo */}
        <div className="col-span-5 sm:col-span-4 order-1 flex items-center min-w-0">
          <Link
            href="/"
            aria-label="designlabs home"
            className="relative shrink-0 h-7 w-24 sm:h-9 sm:w-32 md:h-11 md:w-36 lg:h-12 lg:w-44 transition-transform duration-200 hover:scale-[1.02]"
          >
            <Image
              src="/images/logo-designlabs.png"
              alt="designlabs agency logo"
              fill
              priority
              unoptimized
              className="object-contain object-left"
            />
          </Link>
        </div>

        {/* Center: Uppercase Links (Full clean row on mobile below top bar; centered inline on sm+) */}
        <div className="col-span-12 sm:col-span-4 order-3 sm:order-2 flex items-center justify-center gap-6 sm:gap-7 md:gap-10 pt-0.5 sm:pt-0">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActiveLink(link.label)}
              className={`relative py-1 font-mono text-[10px] sm:text-[11px] md:text-xs font-semibold uppercase tracking-[0.14em] whitespace-nowrap transition-colors duration-200 ${
                activeLink === link.label ? "text-white" : "text-white/75 hover:text-white"
              }`}
            >
              {link.label}
              <span
                className={`absolute left-0 -bottom-0.5 h-px bg-[#e8b76b] transition-all duration-300 ${
                  activeLink === link.label ? "w-full" : "w-0"
                }`}
                aria-hidden="true"
              />
            </a>
          ))}
        </div>

        {/* Right: Circular Arrow + "Start a Project" -> Direct WhatsApp */}
        <div className="col-span-7 sm:col-span-4 order-2 sm:order-3 flex justify-end">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 sm:gap-3.5 cursor-pointer"
          >
            <span className="w-7 h-7 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full border border-white/40 group-hover:border-[#e8b76b] group-hover:bg-[#e8b76b] flex items-center justify-center text-white group-hover:text-[#1a0a02] transition-all duration-300 shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:rotate-45" />
            </span>
            <span className="font-mono text-[9px] sm:text-[11px] md:text-xs font-bold uppercase tracking-[0.14em] text-white whitespace-nowrap">
              Start a Project
            </span>
          </a>
        </div>

      </div>
    </nav>
  );
}
