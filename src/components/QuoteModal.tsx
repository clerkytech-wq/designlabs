"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle, Sparkles, Send } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Brand Identity",
  ]);
  const [budget, setBudget] = useState("$5k - $15k");

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

  const toggleService = (name: string) => {
    if (selectedServices.includes(name)) {
      setSelectedServices(selectedServices.filter((s) => s !== name));
    } else {
      setSelectedServices([...selectedServices, name]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#3d1203]/10 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-[#faf8f5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#3d1203] flex items-center justify-center text-[#e8c580]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#3d1203]">Request a Free Quote</h3>
              <p className="text-xs text-[#3d1203]/70">Let’s build something extraordinary together.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-[#3d1203] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#3d1203]/10 flex items-center justify-center text-[#3d1203]">
              <CheckCircle className="w-8 h-8 text-[#3d1203]" />
            </div>
            <h4 className="text-xl font-bold text-[#3d1203]">Quote Request Received!</h4>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Thank you for reaching out to <span className="font-semibold text-[#3d1203]">designlabs</span>. Our creative director will review your brief and send a custom proposal within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Services checklist */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3d1203] mb-2">
                What are you looking to create?
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  "Brand Identity",
                  "Digital Product / UI-UX",
                  "Web Development",
                  "3D & Motion Graphics",
                  "Creative Direction",
                  "Packaging & Print",
                ].map((srv) => (
                  <button
                    type="button"
                    key={srv}
                    onClick={() => toggleService(srv)}
                    className={`px-3 py-2.5 rounded-lg border text-left font-medium transition-all ${
                      selectedServices.includes(srv)
                        ? "bg-[#3d1203] text-[#e8c580] border-[#3d1203]"
                        : "bg-white text-gray-700 border-gray-200 hover:border-[#e8c580]"
                    }`}
                  >
                    {srv}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#3d1203] mb-2">
                Estimated Project Budget
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {["$3k - $8k", "$8k - $20k", "$20k+"].map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudget(b)}
                    className={`py-2 rounded-lg border font-semibold text-center transition-all ${
                      budget === b
                        ? "bg-[#3d1203] text-[#e8c580] border-[#3d1203]"
                        : "bg-white text-gray-700 border-gray-200 hover:border-[#e8c580]"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Maya Lin"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#3d1203]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="maya@company.com"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#3d1203]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Project Overview</label>
              <textarea
                rows={2}
                placeholder="Briefly describe your vision, brand goals, or deadline..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#3d1203] resize-none"
              ></textarea>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#3d1203] text-[#e8c580] font-bold text-sm hover:bg-[#5a1d08] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#3d1203]/20"
              >
                <Send className="w-4 h-4" />
                Submit Quote Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
