"use client";

import React from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface ClientReview {
  id: string;
  ratingLabel: string;
  quote: string;
  author: string;
}

const clientReviews: ClientReview[] = [
  {
    id: "review-brand-architecture",
    ratingLabel: "(5 star)",
    quote:
      "Working with DesignLabs was a turning point for our business. They didn't just redesign our visuals — they helped us clarify who we are and how we should be seen. Every touchpoint now feels intentional and unmistakable.",
    author: "Kwame Boateng",
  },
  {
    id: "review-kinsocial",
    ratingLabel: "(5 star)",
    quote:
      "DesignLabs engineered our entire digital flagship from concept to launch. Their eye for layout rhythm, responsive speed, and storytelling helped our diaspora community feel right at home from day one.",
    author: "Kin Social Team",
  },
  {
    id: "review-lapam-zorkor",
    ratingLabel: "(5 star)",
    quote:
      "From our full 33-page brand brochure and pizza menu design to our flagship hotel website, every deliverable came back crisp, cohesive, and refined. Guests consistently compliment how premium our brand looks.",
    author: "Lapam Zorkor Hotel",
  },
  {
    id: "review-teerex",
    ratingLabel: "(5 star)",
    quote:
      "They transformed complex delivery ordering, checkout, and tracking flows into an effortless mobile UI. Every screen felt fast, clear, and unmistakably aligned with our brand identity and customers.",
    author: "Teerex Product Team",
  },
];

function FiveStars({ colorClass = "text-[#ba3d03]", sizeClass = "w-3.5 h-3.5 sm:w-4 sm:h-4" }: { colorClass?: string; sizeClass?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${colorClass}`} aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((idx) => (
        <svg key={idx} className={`${sizeClass} fill-current`} viewBox="0 0 24 24" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function PortfolioSection() {
  return (
    <section
      id="reviews"
      className="relative w-full max-w-full overflow-hidden bg-[#ba3d03] select-none"
      aria-label="Client Reviews"
    >
      {/* Top White Wave Crest transitioning directly out of Projects Section */}
      <div
        className="w-full h-12 sm:h-16 md:h-20 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-full block"
        >
          <path
            d="M0,0 L1440,0 L1440,28 C1340,86 1220,-6 1100,40 C960,94 860,12 720,52 C580,92 470,4 360,44 C230,96 120,90 0,24 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Main DesignLabs Orange Review Stage */}
      <div className="relative w-full bg-[#ba3d03] pt-8 sm:pt-12 md:pt-14 pb-14 sm:pb-18 md:pb-22 px-4 sm:px-8 md:px-12 overflow-hidden">
          {/* Ultra-Subtle Brand Pebble Watermark Background Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.065]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='96' height='96' viewBox='0 0 96 96' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M48 22c14 0 26 11 26 26S62 74 48 74 22 63 22 48s12-26 26-26zm0 11c-8 0-15 6-15 15s7 15 15 15 15-6 15-15-7-15-15-15z' fill='none' stroke='%23ffffff' stroke-width='2'/%3E%3C/svg%3E")`,
              backgroundSize: "88px 88px",
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Floating Decorative Stickers + Centered Display Title */}
            <div className="relative text-center pb-8 sm:pb-12 md:pb-14">
              {/* Left Tilted Sticker Pill */}
              <div
                className="hidden sm:inline-flex items-center justify-center absolute left-2 md:left-8 top-6 -rotate-12 bg-[#111111] text-white font-black uppercase tracking-wide text-sm md:text-base px-5 py-2.5 rounded-full shadow-[4px_5px_0px_#631f04] border border-[#e8c580]/40 transition-transform duration-300 hover:scale-105"
                aria-hidden="true"
              >
                BOLD CRAFT
              </div>

              {/* Top-Right Amber Smiley Emblem */}
              <div
                className="hidden sm:flex items-center justify-center absolute right-14 md:right-24 -top-2 rotate-12 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#e8c580] text-[#111111] shadow-[3px_4px_0px_#631f04] transition-transform duration-300 hover:scale-110"
                aria-hidden="true"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="9" r="1.1" fill="currentColor" stroke="none" />
                  <circle cx="15" cy="9" r="1.1" fill="currentColor" stroke="none" />
                  <path d="M8 14c1.2 2 2.6 3 4 3s2.8-1 4-3" />
                </svg>
              </div>

              {/* Right Oval Pill Sticker */}
              <div
                className="hidden sm:inline-flex items-center justify-center absolute right-2 md:right-6 top-16 md:top-20 -rotate-6 bg-[#e8c580] text-[#111111] font-black uppercase tracking-wider text-xs md:text-sm px-6 py-2.5 rounded-[999px] shadow-[4px_5px_0px_#631f04] transition-transform duration-300 hover:scale-105"
                aria-hidden="true"
              >
                BUILT TO LAST
              </div>

              {/* Stacked Chunky Headline */}
              <h2
                className="font-black tracking-[-0.03em] text-[40px] sm:text-6xl md:text-[68px] leading-[0.94] text-white"
                style={{
                  WebkitTextStroke: "1.5px #4f1802",
                  textShadow: "4px 6px 0px #4f1802",
                }}
              >
                Our clients
                <br />
                review
              </h2>

              {/* Star Rating Summary */}
              <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2 text-xs sm:text-sm text-white">
                <FiveStars colorClass="text-[#e8c580]" sizeClass="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="font-medium text-white/90">(+45 trusted brands)</span>
              </div>

              {/* "Write a review" CTA with Delicate Wavy Underline -> Direct WhatsApp */}
              <div className="mt-3 sm:mt-4 inline-flex flex-col items-center">
                <a
                  href={getWhatsAppUrl("Client Review & Feedback")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-semibold text-[#e8c580] hover:text-white transition-colors tracking-wide"
                >
                  Write a review
                </a>
                <svg
                  viewBox="0 0 120 10"
                  className="w-24 sm:w-28 h-2.5 mt-1 text-[#e8c580]/90"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2,5 Q12,1 22,5 T42,5 T62,5 T82,5 T102,5 T118,5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* 2x2 Grid of Crisp White Review Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              {clientReviews.map((review) => (
                <article
                  key={review.id}
                  className="bg-white text-zinc-900 rounded-2xl sm:rounded-[20px] p-5 sm:p-6 md:p-7 shadow-[0_14px_32px_rgba(0,0,0,0.4)] flex flex-col justify-between gap-4 sm:gap-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="space-y-3 sm:space-y-3.5">
                    {/* Top Star Rating Row */}
                    <div className="flex items-center gap-2">
                      <FiveStars colorClass="text-[#ba3d03]" sizeClass="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-semibold text-zinc-900">
                        {review.ratingLabel}
                      </span>
                    </div>

                    {/* Client Quote */}
                    <blockquote className="text-xs sm:text-[13.5px] md:text-[14px] leading-[1.6] text-zinc-700 font-normal">
                      {review.quote}
                    </blockquote>
                  </div>

                  {/* Author Pill Badge */}
                  <div>
                    <span className="inline-flex items-center rounded-full border border-zinc-300 px-3.5 py-1 text-[11px] sm:text-xs text-zinc-600">
                      Review by:
                      <span className="ml-1 font-semibold text-[#ba3d03]">
                        {review.author}
                      </span>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}
