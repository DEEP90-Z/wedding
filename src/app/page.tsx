"use client";

import React, { useState, useRef, useEffect } from "react";
import { weddingData } from "@/data/wedding";
import { WeddingIntroVideo } from "@/components/WeddingIntroVideo";
import { CelebrationsSection } from "@/components/CelebrationsSection";
import { RSVPSection } from "@/components/RSVPSection";
import { ClosingSection } from "@/components/ClosingSection";
import { Volume2, VolumeX } from "lucide-react";

export default function WeddingPage() {
  const [isMuted, setIsMuted] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.8;
    }
  }, []);

  // Strict scroll lock: no one can scroll the website until the video finishes
  useEffect(() => {
    if (!canScroll) {
      const preventDefault = (e: TouchEvent | WheelEvent) => {
        e.preventDefault();
      };

      const preventKeyScroll = (e: KeyboardEvent) => {
        const blockedKeys = ["Space", "ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"];
        if (blockedKeys.includes(e.code) || blockedKeys.includes(e.key)) {
          e.preventDefault();
        }
      };

      // Lock both documentElement and body
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.height = "100svh";

      window.addEventListener("wheel", preventDefault, { passive: false });
      window.addEventListener("touchmove", preventDefault, { passive: false });
      window.addEventListener("keydown", preventKeyScroll);

      return () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.body.style.height = "";
        window.removeEventListener("wheel", preventDefault);
        window.removeEventListener("touchmove", preventDefault);
        window.removeEventListener("keydown", preventKeyScroll);
      };
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
  }, [canScroll]);

  const handleUserStarted = () => {
    if (audioRef.current && !isMuted) {
      audioRef.current.muted = false;
      audioRef.current.play().catch((err) => {
        console.warn("Audio autoplay blocked or failed:", err);
      });
    }
  };

  // Called when video reaches the end: unlock page scrolling without auto-scrolling
  const handleVideoEnd = () => {
    setCanScroll(true);
  };

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.muted = false;
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`relative min-h-screen bg-[#071912] text-[#173b2d] ${!canScroll ? "h-screen overflow-hidden" : ""}`}>
      {/* Background Wedding Music Player */}
      <audio
        ref={audioRef}
        src="/audio/wedding-song.mp3"
        loop
        preload="auto"
      />

      {/* Persistent Always-on-Screen Sound On / Sound Off Button */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[100] pointer-events-auto">
        <button
          onClick={toggleSound}
          aria-label={isMuted ? "Turn sound on" : "Turn sound off"}
          className={`group flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-xl cursor-pointer select-none ${
            isMuted
              ? "bg-black/75 border-white/20 text-white/70 hover:bg-black/90 hover:border-white/40 hover:text-white"
              : "bg-[#071912]/90 border-[#e5c365] text-[#ecd690] shadow-[0_0_18px_rgba(229,195,101,0.25)] hover:bg-[#0a2319] hover:shadow-[0_0_24px_rgba(229,195,101,0.45)]"
          }`}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-4 h-4 text-[#ecd690] animate-pulse" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#e5c365] rounded-full animate-ping" />
            </div>
          )}

          <span className="text-[11px] sm:text-xs font-sans-caps tracking-[0.2em] font-medium">
            {isMuted ? "SOUND OFF" : "SOUND ON"}
          </span>

          {/* Equalizer animation bars when Sound is ON */}
          {!isMuted && (
            <span className="flex items-end gap-[2.5px] h-3 ml-0.5" aria-hidden="true">
              <span className="w-[2px] bg-[#ecd690] rounded-full animate-[bounce_1s_infinite_100ms] h-2" />
              <span className="w-[2px] bg-[#ecd690] rounded-full animate-[bounce_1s_infinite_300ms] h-3" />
              <span className="w-[2px] bg-[#ecd690] rounded-full animate-[bounce_1s_infinite_200ms] h-1.5" />
            </span>
          )}
        </button>
      </div>

      <main className="relative w-full">
        {/* 1. Hero Section Video */}
        <WeddingIntroVideo
          isMuted={isMuted}
          onUserStarted={handleUserStarted}
          onVideoEnd={handleVideoEnd}
        />

        {/* 2. Celebrations Section with Canva-style floral designs */}
        <CelebrationsSection />

        {/* 3. RSVP Section with floral motifs */}
        <RSVPSection data={weddingData.rsvp} />

        {/* 4. Best Compliments & Closing Section */}
        <ClosingSection
          compliments={weddingData.compliments}
          closing={weddingData.closing}
          couple={weddingData.couple}
          onBackToTop={handleBackToTop}
        />
      </main>
    </div>
  );
}
