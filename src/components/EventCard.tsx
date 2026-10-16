"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, Sparkles, Music, Crown, HeartHandshake, Flower2, ExternalLink } from "lucide-react";
import { EventDetail } from "@/data/wedding";
import { CanvaFloralCorner, CanvaFloralCrest } from "./Ornaments";

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

  // Determine event theme for color styling
  const getEventStyle = () => {
    switch (event.id) {
      case "haldi-milad":
        return {
          themeKey: "haldi" as const,
          cardClass: "luxury-card-haldi text-[#5c3c04]",
          borderFrame: "border-[#d99b1a]/35",
          iconWrapper: "bg-[#fff3cc] text-[#b87c08] border border-[#d99b1a]/50",
          ceremonyBadge: "border-[#d99b1a]/50 text-[#855304] bg-[#fff8db]",
          dateBadge: "bg-[#fff3cc] text-[#855304] border-[#d99b1a]/40 font-medium",
          textColor: "text-[#6b4507]",
          venueBorder: "border-[#e0b754]/50 text-[#543302]",
          pinColor: "text-[#d99b1a]",
          notesColor: "text-[#7a5210]",
          mapButton: "border border-[#d99b1a] text-[#543302] bg-[#fff8db] hover:bg-[#b87c08] hover:text-white shadow-sm",
        };
      case "mehendi":
        return {
          themeKey: "mehendi" as const,
          cardClass: "luxury-card-mehendi text-[#184422]",
          borderFrame: "border-[#4c8555]/35",
          iconWrapper: "bg-[#ebf8e6] text-[#246132] border border-[#4c8555]/50",
          ceremonyBadge: "border-[#4c8555]/50 text-[#1e532b] bg-[#f0faec]",
          dateBadge: "bg-[#ebf8e6] text-[#1e532b] border-[#4c8555]/40 font-medium",
          textColor: "text-[#21522a]",
          venueBorder: "border-[#8bc796]/50 text-[#143b1c]",
          pinColor: "text-[#2e7d32]",
          notesColor: "text-[#2e6939]",
          mapButton: "border border-[#3d7a4b] text-[#143b1c] bg-[#f0faec] hover:bg-[#1e532b] hover:text-white shadow-sm",
        };
      case "qawwali":
        return {
          themeKey: "qawwali" as const,
          cardClass: "luxury-card-qawwali text-[#f4ebff]",
          borderFrame: "border-[#d4af37]/35",
          iconWrapper: "bg-[#2d2559] text-[#e5c365] border border-[#d4af37]/50",
          ceremonyBadge: "border-[#d4af37]/45 text-[#ecd690] bg-black/40",
          dateBadge: "bg-[#281f54] text-[#ecd690] border-[#d4af37]/50",
          textColor: "text-[#e9dcff]",
          venueBorder: "border-[#4e3f8a]/60 text-[#f5efff]",
          pinColor: "text-[#ecd690]",
          notesColor: "text-[#d4c5f9]",
          mapButton: "bg-[#d4af37] text-[#110d29] hover:bg-white font-semibold shadow-md",
        };
      case "barat":
        return {
          themeKey: "barat" as const,
          cardClass: "luxury-card-barat text-[#fff1f2]",
          borderFrame: "border-[#e5c365]/35",
          iconWrapper: "bg-[#45141b] text-[#f4df9b] border border-[#e5c365]/50",
          ceremonyBadge: "border-[#e5c365]/45 text-[#f4df9b] bg-black/40",
          dateBadge: "bg-[#3d1017] text-[#f4df9b] border-[#e5c365]/50",
          textColor: "text-[#ffe4e6]",
          venueBorder: "border-[#6b222d]/60 text-[#fff1f2]",
          pinColor: "text-[#f4df9b]",
          notesColor: "text-[#fecdd3]",
          mapButton: "bg-[#f4df9b] text-[#2f0e13] hover:bg-white font-semibold shadow-md",
        };
      case "walima":
      default:
        return {
          themeKey: "walima" as const,
          cardClass: "luxury-card-walima text-[#fdfbf6]",
          borderFrame: "border-[#e5c365]/35",
          iconWrapper: "bg-[#1f4a38] text-[#f4df9b] border border-[#e5c365]/50",
          ceremonyBadge: "border-[#e5c365]/45 text-[#f4df9b] bg-black/40",
          dateBadge: "bg-[#133c2d]/90 text-[#ecd690] border-[#e5c365]/45",
          textColor: "text-emerald-100/95",
          venueBorder: "border-emerald-800/60 text-[#f5ebd6]",
          pinColor: "text-[#ecd690]",
          notesColor: "text-emerald-200/85",
          mapButton: "bg-[#ecd690] text-[#071912] hover:bg-white font-semibold shadow-md",
        };
    }
  };

  const st = getEventStyle();

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 overflow-hidden group shadow-2xl ${st.cardClass}`}
    >
      {/* Decorative Canva-style botanical flowers at all 4 corners with custom theme colors */}
      <div className="absolute top-2 left-2">
        <CanvaFloralCorner position="top-left" theme={st.themeKey} className="w-20 h-20 opacity-90" />
      </div>
      <div className="absolute top-2 right-2">
        <CanvaFloralCorner position="top-right" theme={st.themeKey} className="w-20 h-20 opacity-90" />
      </div>
      <div className="absolute bottom-2 left-2">
        <CanvaFloralCorner position="bottom-left" theme={st.themeKey} className="w-16 h-16 opacity-75" />
      </div>
      <div className="absolute bottom-2 right-2">
        <CanvaFloralCorner position="bottom-right" theme={st.themeKey} className="w-16 h-16 opacity-75" />
      </div>

      {/* Decorative inner gold border frame */}
      <div className={`absolute inset-4 rounded-2xl pointer-events-none border ${st.borderFrame}`} />

      {/* Main card body */}
      <div className="relative z-10 flex flex-col items-center text-center pt-2">
        {/* Top badge and icon */}
        <div className="flex items-center justify-between w-full mb-3 px-2">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm ${st.iconWrapper}`}
          >
            {getIcon(event.iconName)}
          </div>

          <span
            className={`text-[10px] font-sans-caps tracking-[0.25em] px-3.5 py-1 rounded-full border ${st.ceremonyBadge}`}
          >
            CEREMONY {index + 1}
          </span>
        </div>

        {/* Decorative Canva-style event title with floral crown flourish in matched theme */}
        <CanvaFloralCrest title={event.title} theme={st.themeKey} />

        {/* Date Display with Antique Ribbon Aesthetic */}
        <div
          className={`inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-sm sm:text-base font-serif mb-4 shadow-sm border ${st.dateBadge}`}
        >
          <Calendar className="w-4 h-4 opacity-80" />
          <span>{event.date}</span>
        </div>

        {/* Timings */}
        <div className="space-y-2 my-3 w-full max-w-xs">
          {event.times.map((t, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-center gap-2 text-sm sm:text-base ${st.textColor}`}
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
            className={`mt-4 pt-3 border-t w-full max-w-sm flex items-center justify-center gap-2 text-sm sm:text-base ${st.venueBorder}`}
          >
            <MapPin className={`w-4 h-4 shrink-0 opacity-80 ${st.pinColor}`} />
            <div>
              {event.venue && <span className="font-semibold">{event.venue}</span>}
              {event.venue && event.location && <span className="opacity-70"> · </span>}
              {event.location && <span className="text-xs sm:text-sm opacity-90">{event.location}</span>}
            </div>
          </div>
        )}

        {/* Notes */}
        {event.notes && (
          <p className={`mt-4 text-xs sm:text-sm italic font-serif max-w-xs ${st.notesColor}`}>
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
            className={`inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-xs font-sans-caps tracking-widest transition-all ${st.mapButton}`}
          >
            <span>VIEW ON GOOGLE MAPS</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </motion.article>
  );
};
