"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, Phone, Check, Heart } from "lucide-react";
import { WeddingData } from "@/data/wedding";
import { GoldArchMotif, CanvaFloralGarland, CanvaFloralCorner } from "./Ornaments";

interface RSVPSectionProps {
  data: WeddingData["rsvp"];
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({ data }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyPhone = (phone: string, idx: number) => {
    if (!phone) return;
    navigator.clipboard.writeText(phone);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <section id="rsvp" className="py-24 px-6 parchment-texture text-[#173b2d] relative overflow-hidden border-t border-[#cda243]/20">
      {/* Botanical floral corners */}
      <div className="absolute top-0 right-0">
        <CanvaFloralCorner position="top-right" className="w-24 sm:w-36 h-24 sm:h-36 opacity-75" />
      </div>
      <div className="absolute bottom-0 left-0">
        <CanvaFloralCorner position="bottom-left" className="w-24 sm:w-36 h-24 sm:h-36 opacity-75" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <GoldArchMotif className="w-28 h-8 mx-auto mb-3" />
          <span className="text-xs font-sans-caps tracking-[0.3em] text-[#9b7226]">
            KINDLY RESPOND
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-[#133c2a] mt-2 mb-2">
            {data.title}
          </h2>
          <div className="my-3 flex justify-center">
            <CanvaFloralGarland className="w-52 h-6" />
          </div>
          <p className="text-base sm:text-lg font-serif italic text-[#3f574a] max-w-xl mx-auto mb-10">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {data.contacts.map((contact, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="relative luxury-card-border bg-[#fffcf7]/95 p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-shadow group overflow-hidden"
            >
              {/* Mini corner floral touches */}
              <div className="absolute top-1 left-1">
                <CanvaFloralCorner position="top-left" className="w-8 h-8 opacity-45" />
              </div>

              <div className="w-10 h-10 rounded-full bg-[#f4ebd6] border border-[#cda243]/40 flex items-center justify-center text-[#8c641d] mb-3 group-hover:scale-105 transition-transform shadow-inner">
                <UserCheck className="w-4 h-4" />
              </div>
              <h4 className="text-lg font-serif font-semibold text-[#173b2d]">
                {contact.name}
              </h4>

              {contact.phone ? (
                <button
                  onClick={() => handleCopyPhone(contact.phone!, idx)}
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-[#8c641d] font-sans hover:underline"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Phone className="w-3 h-3 opacity-70" />
                      <span>{contact.phone}</span>
                    </>
                  )}
                </button>
              ) : (
                <span className="text-[10px] font-sans-caps tracking-widest text-[#a6823c] mt-2 opacity-85">
                  HONORED HOST
                </span>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex items-center justify-center gap-2 text-sm font-serif italic text-[#637d6e]"
        >
          <Heart className="w-4 h-4 text-[#cda243] fill-[#cda243]/30" />
          <span>{data.note}</span>
        </motion.div>
      </div>
    </section>
  );
};
