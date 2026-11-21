"use client";

import React, { useEffect } from "react";
import { X, ShoppingBag, ArrowRight } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

export default function CartDrawer({ isOpen, onClose, onOpenQuote }: CartDrawerProps) {
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

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#3d1203]" />
            <h3 className="font-bold text-[#3d1203]">Your Project Bag</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-[#3d1203] hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-[#e8c580]/50 bg-[#faf8f5]">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm text-[#3d1203]">Brand Discovery Sprint</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#3d1203] text-[#e8c580]">
                  Free Tier
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                1-on-1 strategy session with our creative leads to audit your brand & digital roadmap.
              </p>
              <div className="text-xs font-bold text-[#3d1203]">$0.00 / 30 mins</div>
            </div>

            <div className="rounded-xl border border-dashed border-gray-200 p-4 text-center">
              <p className="text-xs text-gray-500">
                Want to bundle full-stack branding, 3D motion, or bespoke web design?
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Estimated Total</span>
              <span className="font-bold text-[#3d1203]">$0.00 (Complimentary)</span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="w-full py-3 rounded-xl bg-[#3d1203] text-[#e8c580] font-bold text-sm hover:bg-[#5a1d08] transition-colors flex items-center justify-center gap-2"
            >
              Continue to Quote
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
