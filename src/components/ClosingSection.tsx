"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { WeddingData } from "@/data/wedding";
import { CanvaFloralGarland, GoldArchMotif, CanvaFloralCorner } from "./Ornaments";

interface ClosingSectionProps {
  compliments: WeddingData["compliments"];
  closing: WeddingData["closing"];
  couple: WeddingData["couple"];
  onBackToTop: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({
  compliments,
  closing,
  couple,
  onBackToTop,
}) => {
  return (
    <footer className="relative emerald-texture-rich text-[#faf6ed] overflow-hidden pt-24 pb-14 px-6 border-t border-[#cda243]/30">
      {/* Botanical floral corners in antique gold on emerald */}
      <div className="absolute top-0 left-0">
        <CanvaFloralCorner position="top-left" className="w-28 sm:w-44 h-28 sm:h-44 opacity-60" />
      </div>
      <div className="absolute top-0 right-0">
        <CanvaFloralCorner position="top-right" className="w-28 sm:w-44 h-28 sm:h-44 opacity-60" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Compliments Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 w-full"
        >
          <span className="text-xs font-sans-caps tracking-[0.3em] text-[#ecd690] uppercase">
            With Warm Regards
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-medium text-[#fcf8f0] mt-1 mb-3">
            {compliments.title}
          </h3>

          <div className="my-3 flex justify-center">
            <CanvaFloralGarland className="w-52 h-6" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 my-6">
            {compliments.names.map((name, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <span className="text-[#ecd690] text-sm font-script sm:text-2xl">
                    &amp;
                  </span>
                )}
                <div className="px-7 py-3.5 rounded-lg bg-[#0e3023]/90 border border-[#ecd690]/40 text-lg sm:text-xl font-serif tracking-wide shadow-md backdrop-blur-sm">
                  {name}
                </div>
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Final Blessing & Couple Signature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="flex flex-col items-center my-6"
        >
          <GoldArchMotif className="w-24 h-6 text-[#ecd690] mb-4" />

          <h2 className="text-5xl sm:text-7xl font-script text-[#fdf8ed] leading-tight drop-shadow-md">
            {couple.groom.firstName} &amp; {couple.bride.firstName}
          </h2>

          <p className="mt-4 text-base sm:text-lg font-serif italic text-[#e0cfaf] max-w-md">
            &ldquo;{closing.message}&rdquo;
          </p>

          <div className="mt-10">
            <button
              onClick={onBackToTop}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-[#ecd690]/70 bg-[#163e2e]/90 text-[#ecd690] hover:text-[#fffdfa] hover:bg-[#1f523e] hover:border-[#fcf8f0] transition-all text-xs font-sans-caps tracking-widest shadow-xl cursor-pointer"
            >
              <span>BACK TO BEGINNING</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Small Footer Notice */}
        <div className="mt-16 pt-8 border-t border-[#ecd690]/20 w-full text-center">
          <p className="text-[11px] font-sans-caps tracking-[0.25em] text-[#b8a074]/70">
            CELEBRATING THE WEDDING OF SHARIQ &amp; ANDLEEB
          </p>
        </div>
      </div>
    </footer>
  );
};
