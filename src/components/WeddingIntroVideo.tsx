"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GoldArchMotif, FloatingPetals } from "./Ornaments";

interface WeddingIntroVideoProps {
  isMuted: boolean;
  onUserStarted: () => void;
  onVideoEnd?: () => void;
}

export const WeddingIntroVideo: React.FC<WeddingIntroVideoProps> = ({
  isMuted,
  onUserStarted,
  onVideoEnd,
}) => {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Status states: "LOADING" -> "READY" -> "PLAYING" -> "ENDED"
  const [videoStatus, setVideoStatus] = useState<"LOADING" | "READY" | "PLAYING" | "ENDED">("LOADING");
  const [isDesktop, setIsDesktop] = useState(false);

  // Device orientation / screen detection
  useEffect(() => {
    const checkDevice = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      const isWide = window.innerWidth >= 850;
      setIsDesktop(isLandscape || isWide);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Preload and prime videos immediately on mount
  useEffect(() => {
    const dVideo = desktopVideoRef.current;
    const mVideo = mobileVideoRef.current;

    if (dVideo) dVideo.load();
    if (mVideo) mVideo.load();

    const checkReady = () => {
      const active = isDesktop ? desktopVideoRef.current : mobileVideoRef.current;
      if (active && active.readyState >= 2) {
        setVideoStatus((curr) => (curr === "LOADING" ? "READY" : curr));
      }
    };

    if (dVideo) {
      dVideo.addEventListener("canplay", checkReady);
      dVideo.addEventListener("loadeddata", checkReady);
    }
    if (mVideo) {
      mVideo.addEventListener("canplay", checkReady);
      mVideo.addEventListener("loadeddata", checkReady);
    }

    checkReady();

    const timer = setTimeout(() => {
      setVideoStatus((curr) => (curr === "LOADING" ? "READY" : curr));
    }, 2200);

    return () => {
      if (dVideo) {
        dVideo.removeEventListener("canplay", checkReady);
        dVideo.removeEventListener("loadeddata", checkReady);
      }
      if (mVideo) {
        mVideo.removeEventListener("canplay", checkReady);
        mVideo.removeEventListener("loadeddata", checkReady);
      }
      clearTimeout(timer);
    };
  }, [isDesktop]);

  // Keep video track muted so the background song plays clearly without dual-audio conflict
  useEffect(() => {
    if (desktopVideoRef.current) desktopVideoRef.current.muted = true;
    if (mobileVideoRef.current) mobileVideoRef.current.muted = true;
  }, [isMuted]);

  // Click "TAP TO ENTER"
  const handleTapToEnter = () => {
    const activeVideo = isDesktop ? desktopVideoRef.current : mobileVideoRef.current;
    if (!activeVideo) return;

    setVideoStatus("PLAYING");
    activeVideo.muted = true;

    if (activeVideo.currentTime > 0.5) {
      activeVideo.currentTime = 0;
    }

    const playPromise = activeVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Autoplay fallback:", err);
        activeVideo.muted = true;
        activeVideo.play().catch(() => {});
      });
    }

    // Signal parent that user tapped to start experience
    onUserStarted();
  };

  // Video ended callback: freeze on final frame cleanly
  const handleEnded = () => {
    const activeVideo = isDesktop ? desktopVideoRef.current : mobileVideoRef.current;
    if (activeVideo) {
      activeVideo.pause();
    }
    setVideoStatus("ENDED");
    if (onVideoEnd) onVideoEnd();
  };

  const scrollToCelebrations = () => {
    const el = document.getElementById("celebrations");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[100svh] min-h-[100svh] bg-[#071912] flex items-center justify-center overflow-hidden select-none">
      {/* 
        MAIN FULL-SCREEN VIDEO CONTAINER:
        100% full screen (w-full h-full object-cover) on all devices:
        - Completely fills entire screen edge-to-edge
        - No black side bars or gaps
        - Full immersive cinematic presentation
      */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden">
        {/* PC / LAPTOP (16:9 Landscape Video - 100% Full Screen Cover) */}
        <video
          ref={desktopVideoRef}
          playsInline
          webkit-playsinline="true"
          preload="auto"
          onEnded={handleEnded}
          className={`w-full h-full object-cover pointer-events-none ${
            isDesktop ? "block" : "hidden"
          }`}
        >
          <source src="/videos/is_gwr_video_mvp.mp4" type="video/mp4" />
        </video>

        {/* MOBILE (9:16 Portrait Video - 100% Full Screen Cover) */}
        <video
          ref={mobileVideoRef}
          playsInline
          webkit-playsinline="true"
          preload="auto"
          onEnded={handleEnded}
          className={`w-full h-full object-cover pointer-events-none ${
            !isDesktop ? "block" : "hidden"
          }`}
        >
          <source src="/videos/wedding-intro.mp4" type="video/mp4" />
        </video>
      </div>

      {/* OVERLAY 1: "Your Invitation is Loading..." */}
      <AnimatePresence>
        {videoStatus === "LOADING" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#071912]/95 backdrop-blur-sm px-6 text-center"
          >
            <FloatingPetals count={6} />
            <GoldArchMotif className="w-28 sm:w-36 h-10 text-[#e5c365] mb-4 filter drop-shadow-[0_0_12px_rgba(229,195,101,0.4)]" />
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-[#fcf6e8] mb-2 tracking-wide">
              Your Invitation is Loading...
            </h2>
            <p className="text-sm font-serif italic text-[#c8b792] mb-6">
              A royal celebration awaits
            </p>

            <div className="w-52 h-[2px] bg-[#1d3d2e] rounded-full overflow-hidden relative">
              <motion.div
                className="absolute h-full w-24 bg-gradient-to-r from-[#b3852b] via-[#ecd690] to-[#b3852b] rounded-full"
                animate={{ x: ["-100%", "250%"] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERLAY 2: "TAP TO ENTER" Button directly OVER the actual video starting frame */}
      <AnimatePresence>
        {videoStatus === "READY" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.3 } }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/35 backdrop-blur-[1px] px-6 text-center"
          >
            <FloatingPetals count={8} />

            <div className="mb-8">
              <GoldArchMotif className="w-28 sm:w-36 h-10 text-[#e5c365] mb-3 filter drop-shadow-[0_0_12px_rgba(229,195,101,0.5)] mx-auto" />
              <p className="text-xs sm:text-sm tracking-[0.35em] text-[#ecd690] uppercase font-sans-caps">
                Shariq &amp; Andleeb
              </p>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-[#b3852b] via-[#ecd690] to-[#b3852b] opacity-60 blur-md group-hover:opacity-100 transition duration-700 animate-pulse-subtle" />

              <button
                onClick={handleTapToEnter}
                className="relative flex items-center justify-center gap-3 py-4 sm:py-5 px-10 sm:px-14 bg-[#0a2319]/90 hover:bg-[#0d2e21] border border-[#f4df9b] rounded-sm text-white shadow-[0_4px_30px_rgba(0,0,0,0.7)] cursor-pointer transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(229,195,101,0.6)] active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#ecd690]" />
                <span className="text-sm sm:text-base font-sans-caps tracking-[0.32em] font-medium text-[#fffdfa]">
                  TAP TO ENTER
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERLAY 3: When video ends, show scroll button */}
      {videoStatus === "ENDED" && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute bottom-6 inset-x-0 z-30 flex flex-col items-center justify-center pointer-events-auto"
        >
          <button
            onClick={scrollToCelebrations}
            className="flex flex-col items-center gap-1.5 px-6 py-2.5 rounded-full bg-black/65 backdrop-blur-md border border-[#e5c365]/80 text-[#fcf6e8] shadow-2xl hover:bg-black/85 transition-all cursor-pointer group"
          >
            <span className="text-xs font-sans-caps tracking-[0.25em] text-[#ecd690]">
              SCROLL TO CELEBRATIONS
            </span>
            <ChevronDown className="w-4 h-4 text-[#e5c365] animate-bounce" />
          </button>
        </motion.div>
      )}
    </section>
  );
};
