"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Mail } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="w-full max-w-full overflow-hidden bg-[#050505] text-white border-t border-white/10 pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-10 px-3 sm:px-6 md:px-10 lg:px-14 select-none">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Top Row: Headline Left + "Let's Talk" CTA Right */}
        <div className="flex items-center justify-between gap-4 pb-8 sm:pb-12 border-b border-white/25">
          <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.15]">
            Let&apos;s Make Something
            <br />
            Together
          </h2>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 sm:px-9 sm:py-3.5 rounded-lg bg-[#ba3d03] hover:bg-[#d94808] text-white text-xs sm:text-sm font-semibold tracking-tight transition-all duration-200 shadow-lg shadow-[#ba3d03]/20 hover:shadow-[#ba3d03]/35 cursor-pointer active:scale-95 whitespace-nowrap"
          >
            Let&apos;s Talk
          </a>
        </div>

        {/* Middle Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 pt-8 sm:pt-12 pb-10 sm:pb-14">
          
          {/* Brand Column (Left) */}
          <div className="md:col-span-5 space-y-4 sm:space-y-5">
            <div className="relative h-7 sm:h-8 w-32 sm:w-40">
              <Image
                src="/images/logo-designlabs.png"
                alt="designlabs agency logo"
                fill
                unoptimized
                loading="eager"
                className="object-contain object-left"
              />
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm max-w-[280px] leading-relaxed">
              We are a creative agency with several services focused on
              quality and innovation for your business.
            </p>

            {/* Circular Outlined Social Buttons: Instagram, TikTok, Facebook, Twitter */}
            <div className="flex items-center gap-3 pt-1">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/designlabs_gh?hvrq=OGJwNW9xa3N3dzlh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DesignLabs on Instagram"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/40 hover:border-white hover:bg-white/10 flex items-center justify-center text-white/85 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@designlabs_gh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DesignLabs on TikTok"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/40 hover:border-white hover:bg-white/10 flex items-center justify-center text-white/85 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/40 hover:border-white hover:bg-white/10 flex items-center justify-center text-white/85 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                </svg>
              </a>

              {/* Twitter */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/40 hover:border-white hover:bg-white/10 flex items-center justify-center text-white/85 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Link Groups (3 columns side-by-side on all screen sizes) */}
          <div className="md:col-span-7 grid grid-cols-12 gap-4 sm:gap-6">
            
            {/* Quick Link Column */}
            <div className="col-span-4 md:col-span-3 space-y-3 sm:space-y-4">
              <h4 className="text-xs sm:text-sm md:text-base font-semibold text-white">
                Quick Link
              </h4>
              <ul className="space-y-2 sm:space-y-3 text-[11px] sm:text-xs md:text-sm text-zinc-400">
                <li>
                  <a href="#hero" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#works" className="hover:text-white transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="hover:text-white transition-colors">
                    Reviews
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="col-span-3 md:col-span-3 space-y-3 sm:space-y-4">
              <h4 className="text-xs sm:text-sm md:text-base font-semibold text-white">
                Company
              </h4>
              <ul className="space-y-2 sm:space-y-3 text-[11px] sm:text-xs md:text-sm text-zinc-400">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href={getWhatsAppUrl("Careers")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href={getWhatsAppUrl("Press")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>

            {/* Office Column */}
            <div className="col-span-5 md:col-span-6 space-y-3 sm:space-y-4">
              <h4 className="text-xs sm:text-sm md:text-base font-semibold text-white">
                Office
              </h4>
              <ul className="space-y-3 sm:space-y-3.5 text-[10.5px] sm:text-xs md:text-sm text-zinc-400">
                <li className="flex items-start gap-2 sm:gap-2.5">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-300 shrink-0 mt-0.5" />
                  <span className="leading-snug sm:leading-relaxed">
                    Cantonments, 4th Circular Road
                  </span>
                </li>
                <li className="flex items-center gap-2 sm:gap-2.5">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-300 shrink-0" />
                  <a
                    href="mailto:designlabsgh@gmail.com"
                    className="hover:text-white transition-colors truncate"
                  >
                    designlabsgh@gmail.com
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Centered Copyright */}
        <div className="pt-2 sm:pt-4 text-center">
          <p className="text-[10.5px] sm:text-xs text-zinc-400 tracking-wide">
            ©DesignLabs - All Rights Reserved 2026
          </p>
        </div>

      </div>
    </footer>
  );
}
