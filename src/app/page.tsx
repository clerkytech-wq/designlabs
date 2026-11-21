"use client";

import React from "react";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import PortfolioSection from "@/components/PortfolioSection";
import Footer from "@/components/Footer";
import { openWhatsAppChat } from "@/lib/whatsapp";

export default function Home() {
  const handleOpenContact = (topic?: string) => {
    openWhatsAppChat(topic);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#050505] flex flex-col font-sans selection:bg-amber-400 selection:text-zinc-950">
      {/* Full-Bleed Edge-to-Edge Website Container */}
      <div className="w-full flex-1 flex flex-col overflow-hidden">
        
        {/* 1. Hero Section & Partner Strip (Continuous orange gradient) */}
        <Hero onOpenContact={() => handleOpenContact()} />

        {/* 2. About Section (Natural dimensions, editorial layout) */}
        <AboutSection onOpenContact={() => handleOpenContact()} />

        {/* 3. Services Section (Interactive 5-Row Offer List on Orange Gradient) */}
        <ServicesSection onOpenContact={(svc) => handleOpenContact(svc)} />

        {/* 4. Our Projects Section (Horizontal Scrollable Projects on White immediately under Services) */}
        <ProjectsSection onOpenContact={(proj) => handleOpenContact(proj)} />

        {/* 5. Client Review Showcase (User's Gradient & Brand Asset) */}
        <PortfolioSection />

        {/* 6. Agency Footer (Obsidian Black with hero logo mark) */}
        <Footer />

      </div>
    </div>
  );
}
