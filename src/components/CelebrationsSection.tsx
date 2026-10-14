"use client";

import React from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/data/wedding";
import { EventCard } from "./EventCard";
import { GoldArchMotif, CanvaFloralGarland, CanvaFloralCorner } from "./Ornaments";

export const CelebrationsSection: React.FC = () => {
  return (
    <section id="celebrations" className="py-24 px-6 linen-texture-rich text-[#173b2d] relative overflow-hidden border-t border-[#cda243]/30">
      {/* Decorative floral corners for the whole section */}
      <div className="absolute top-0 left-0">
        <CanvaFloralCorner position="top-left" className="w-28 sm:w-44 h-28 sm:h-44 opacity-80" />
      </div>
      <div className="absolute top-0 right-0">
        <CanvaFloralCorner position="top-right" className="w-28 sm:w-44 h-28 sm:h-44 opacity-80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GoldArchMotif className="w-28 h-8 mx-auto mb-3 text-[#b3852b]" />
            <span className="text-xs font-sans-caps tracking-[0.3em] text-[#9b7226]">
              WITH JOYFUL HEARTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-[#133c2a] mt-2 mb-3">
              The Wedding Celebrations
            </h2>
            <div className="my-3 flex justify-center">
              <CanvaFloralGarland className="w-56 h-7" />
            </div>
            <p className="text-base sm:text-xl font-serif italic text-[#3c5446]">
              Join us as we celebrate the beginning of a beautiful new journey.
            </p>
          </motion.div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {weddingData.events.map((event, index) => (
            <div
              key={event.id}
              className={event.id === "walima" ? "md:col-span-2 max-w-2xl mx-auto w-full" : ""}
            >
              <EventCard event={event} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
