"use client";

import React, { useRef, useEffect, useState } from "react";
import { Volume2, VolumeX, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GoldArchMotif, FloatingPetals } from "./Ornaments";

interface WeddingIntroVideoProps {
  isMuted: boolean;
  onToggleMute: () => void;
}

export const WeddingIntroVideo: React.FC<WeddingIntroVideoProps> = ({
  isMuted,
  onToggleMute,
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

    // Call .load() explicitly so browser immediately buffers metadata and the first frame
    if (dVideo) {
      dVideo.load();
    }
    if (mVideo) {
      mVideo.load();
    }

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

    // Safety fallback: allow interaction after a brief delay if network is slow
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

  // Sync mute state on both videos
  useEffect(() => {
    if (desktopVideoRef.current) desktopVideoRef.current.muted = isMuted;
    if (mobileVideoRef.current) mobileVideoRef.current.muted = isMuted;
  }, [isMuted]);

  // Click "TAP TO ENTER"
  const handleTapToEnter = () => {
    const activeVideo = isDesktop ? desktopVideoRef.current : mobileVideoRef.current;
    if (!activeVideo) return;

    setVideoStatus("PLAYING");
    activeVideo.muted = isMuted;

    // Do NOT reset currentTime = 0 if it causes black flash; only reset if past beginning
    if (activeVideo.currentTime > 0.5) {
      activeVideo.currentTime = 0;
    }

    const playPromise = activeVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Autoplay muted fallback:", err);
        activeVideo.muted = true;
        activeVideo.play().catch(() => {});
      });
    }
  };

  // Video ended callback: freeze on final frame cleanly
  const handleEnded = () => {
    const activeVideo = isDesktop ? desktopVideoRef.current : mobileVideoRef.current;
    if (activeVideo) {
      activeVideo.pause();
    }
    setVideoStatus("ENDED");
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
        AMBIENT BLURRED BACKDROP:
        Takes the video edges and softly diffuses them to fill 100% of any screen width/height,
        completely eliminating hard black side cutoffs on ultrawide monitors and laptops!
      */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 filter blur-3xl scale-125">
        <video
          src={isDesktop ? "/videos/is_gwr_video_mvp.mp4" : "/videos/wedding-intro.mp4"}
          poster="/gate.png"
          playsInline
          muted
          loop
          className="w-full h-full object-cover"
        />
      </div>

      {/* Subtle vignette over the ambient backdrop */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#071912]/40 to-[#071912] pointer-events-none z-10" />

      {/* 
        MAIN VIDEO CONTAINER:
        Both videos include poster="/gate.png" and preload="auto" so there is NEVER
        any black frame or delay before playback starts!
      */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        {/* PC / LAPTOP (16:9 Landscape) */}
        <video
          ref={desktopVideoRef}
          poster="/gate.png"
          playsInline
          webkit-playsinline="true"
          preload="auto"
          onEnded={handleEnded}
          className={`w-full h-full object-contain pointer-events-none ${
            isDesktop ? "block" : "hidden"
          }`}
        >
          <source src="/videos/is_gwr_video_mvp.mp4" type="video/mp4" />
        </video>

        {/* MOBILE (9:16 Portrait) */}
        <video
          ref={mobileVideoRef}
          poster="/gate.png"
          playsInline
          webkit-playsinline="true"
          preload="auto"
          onEnded={handleEnded}
          className={`w-full h-full object-cover sm:object-contain pointer-events-none ${
            !isDesktop ? "block" : "hidden"
          }`}
        >
          <source src="/videos/wedding-intro.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Floating sound toggle top right */}
      <div className="absolute top-5 right-5 z-40">
        <button
          onClick={onToggleMute}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#cda243]/60 text-[#f4df9b] hover:bg-black/80 transition shadow-lg text-xs font-sans-caps"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#e5c365]" />
              <span className="text-[10px] tracking-wider">SOUND OFF</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#e5c365] animate-pulse" />
              <span className="text-[10px] tracking-wider">SOUND ON</span>
            </>
          )}
        </button>
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

      {/* OVERLAY 2: "TAP TO ENTER" Button directly OVER the video */}
      <AnimatePresence>
        {videoStatus === "READY" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.3 } }}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px] px-6 text-center"
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
