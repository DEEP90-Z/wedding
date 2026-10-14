"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, Sparkles, Music, Crown, HeartHandshake, Flower2, ExternalLink } from "lucide-react";
import { EventDetail } from "@/data/wedding";
import { CanvaFloralGarland, CanvaFloralCorner, CanvaFloralCrest } from "./Ornaments";

interface EventCardProps {
  event: EventDetail;
  index: number;
}

export const EventCard: React.FC<EventCardProps> = ({ event, index }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case "Sparkles":
        return <Sparkles className="w-5 h-5" />;
      case "Flower2":
        return <Flower2 className="w-5 h-5" />;
      case "Music":
        return <Music className="w-5 h-5" />;
      case "Crown":
        return <Crown className="w-5 h-5" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const isEmerald = event.theme === "emerald";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 overflow-hidden group shadow-xl ${
        isEmerald
          ? "luxury-card-emerald text-[#fdfbf6]"
          : "luxury-card-border bg-[#fffcf7]/95 text-[#173b2d] hover:bg-[#fffdfa]"
      }`}
    >
      {/* Decorative Canva-style botanical flowers at all 4 corners */}
      <div className="absolute top-2 left-2">
        <CanvaFloralCorner position="top-left" className="w-20 h-20 opacity-90" />
      </div>
      <div className="absolute top-2 right-2">
        <CanvaFloralCorner position="top-right" className="w-20 h-20 opacity-90" />
      </div>
      <div className="absolute bottom-2 left-2">
        <CanvaFloralCorner position="bottom-left" className="w-16 h-16 opacity-75" />
      </div>
      <div className="absolute bottom-2 right-2">
        <CanvaFloralCorner position="bottom-right" className="w-16 h-16 opacity-75" />
      </div>

      {/* Decorative inner gold border frame */}
      <div
        className={`absolute inset-4 rounded-2xl pointer-events-none border ${
          isEmerald ? "border-[#e5c365]/25" : "border-[#cda243]/30"
        }`}
      />

      {/* Main card body */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2">
        {/* Top badge and icon */}
        <div className="flex items-center justify-between w-full mb-3 px-2">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm ${
              isEmerald
                ? "bg-[#1f4a38] text-[#f4df9b] border border-[#e5c365]/40"
                : "bg-[#f7efe0] text-[#9b7226] border border-[#cda243]/40"
            }`}
          >
            {getIcon(event.iconName)}
          </div>

          <span
            className={`text-[10px] font-sans-caps tracking-[0.25em] px-3.5 py-1 rounded-full border ${
              isEmerald
                ? "border-[#e5c365]/40 text-[#f4df9b] bg-black/30"
                : "border-[#cda243]/40 text-[#8c641d] bg-[#fbf6ec]"
            }`}
          >
            CEREMONY {index + 1}
          </span>
        </div>

        {/* Decorative Canva-style event title with floral crown flourish */}
        <CanvaFloralCrest title={event.title} isEmerald={isEmerald} />

        {/* Date Display with Antique Gold Ribbon Aesthetic */}
        <div
          className={`inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-sm sm:text-base font-serif mb-4 shadow-sm border ${
            isEmerald
              ? "bg-[#133c2d]/80 text-[#ecd690] border-[#e5c365]/40"
              : "bg-[#f9f2e3] text-[#9c752e] border-[#cda243]/35 font-medium"
          }`}
        >
          <Calendar className="w-4 h-4 opacity-80" />
          <span>{event.date}</span>
        </div>

        {/* Timings */}
        <div className="space-y-2 my-3 w-full max-w-xs">
          {event.times.map((t, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-center gap-2 text-sm sm:text-base ${
                isEmerald ? "text-emerald-100/95" : "text-[#3c5446]"
              }`}
            >
              <Clock className="w-3.5 h-3.5 opacity-70" />
              <span>
                {t.label && <strong className="font-semibold">{t.label}: </strong>}
                {t.time}
              </span>
            </div>
          ))}
        </div>

        {/* Venue or Location */}
        {(event.venue || event.location) && (
          <div
            className={`mt-4 pt-3 border-t w-full max-w-sm flex items-center justify-center gap-2 text-sm sm:text-base ${
              isEmerald
                ? "border-emerald-800/60 text-[#f5ebd6]"
                : "border-[#eeddc4] text-[#2c4033]"
            }`}
          >
            <MapPin className="w-4 h-4 shrink-0 opacity-80 text-[#cda243]" />
            <div>
              {event.venue && <span className="font-semibold">{event.venue}</span>}
              {event.venue && event.location && <span className="opacity-70"> · </span>}
              {event.location && <span className="text-xs sm:text-sm opacity-90">{event.location}</span>}
            </div>
          </div>
        )}

        {/* Notes */}
        {event.notes && (
          <p
            className={`mt-4 text-xs sm:text-sm italic font-serif max-w-xs ${
              isEmerald ? "text-emerald-200/80" : "text-[#647c6e]"
            }`}
          >
            &ldquo;{event.notes}&rdquo;
          </p>
        )}
      </div>

      {/* Map Button */}
      {event.mapQuery && (
        <div className="relative z-10 mt-6 pt-4 border-t border-[#cda243]/20 w-full">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              event.mapQuery
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-xs font-sans-caps tracking-widest transition-all ${
              isEmerald
                ? "bg-[#ecd690] text-[#0d271c] hover:bg-white font-semibold shadow-md"
                : "border border-[#cda243] text-[#173b2d] bg-[#fbf6eb] hover:bg-[#173b2d] hover:text-[#fffdfa] shadow-sm"
            }`}
          >
            <span>VIEW ON GOOGLE MAPS</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </motion.article>
  );
};
